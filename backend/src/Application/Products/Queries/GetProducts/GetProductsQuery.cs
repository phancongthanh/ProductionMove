using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Mappings;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Enums;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Products.Queries.GetProducts;

public class GetProductsQuery : IRequest<PaginatedList<Product>>, ICurrentBuilding
{
    public class ProductFilter
    {
        public int? ProductId { get; set; }

        public List<ProductStatus>? Statuses { get; set; }

        public List<string>? ProductLineIds { get; set; }
    }

    public string Role { get; }

    public string? BuildingId { get; }

    public int PageNumber { get; }
    
    public int PageSize { get; }

    public ProductFilter Filter { get; }

    public GetProductsQuery(string role, string? buildingId, int pageNumber, int pageSize)
    {
        Role = role;
        BuildingId = buildingId;
        PageNumber = pageNumber;
        PageSize = pageSize;
        Filter = new ProductFilter();
    }

    public GetProductsQuery(string role, string? buildingId, int pageNumber, int pageSize, ProductFilter filter)
    {
        Role = role;
        BuildingId = buildingId;
        PageNumber = pageNumber;
        PageSize = pageSize;
        Filter = filter;
    }
}

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, PaginatedList<Product>>
{
    private readonly IApplicationDbContext _context;

    public GetProductsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<PaginatedList<Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        IQueryable<Product>? products = null;
        switch (request.Role)
        {
            case Schema.Role.Administrator:
                products = _context.Products.AsNoTracking().Include(p => p.Warranties);
                break;
            case Schema.Role.Factory:
                products = _context.Products.AsNoTracking()
                    .Include(p => p.Warranties)
                    .Where(p => p.FactoryId == request.BuildingId);
                break;
            case Schema.Role.Distributor:
                products = _context.Products.AsNoTracking()
                    .Include(p => p.Warranties)
                    .Where(p => p.DistributorId == request.BuildingId);
                break;
            case Schema.Role.ServiceCenter:
                var productIds = await _context.Warranties.AsNoTracking()
                        .Where(w => w.ServiceCenterId == request.BuildingId)
                        .Where(w => w.CompletedTime == null)
                        .Select(w => w.ProductId)
                        .Distinct()
                        .ToListAsync(cancellationToken);
                products = _context.Products.AsNoTracking()
                        .Include(p => p.Warranties)
                        .Where(p => productIds.Contains(p.Id));
                break;
            default:
                return PaginatedList<Product>
                    .Create(Enumerable.Empty<Product>(), request.PageNumber, request.PageSize);
        }
        if (request.Filter.ProductLineIds != null)
            if (request.Filter.ProductLineIds.Any())
            {
                var productLineIds = await _context.ProductLines.AsNoTracking()
                    .Where(pl => request.Filter.ProductLineIds.Contains(pl.Name))
                    .Select(pl => pl.Id)
                    .ToListAsync(cancellationToken);
                request.Filter.ProductLineIds.AddRange(productLineIds);
                products = products.Where(p => request.Filter.ProductLineIds.Contains(p.ProductLineId));
            }
        if (request.Filter.Statuses != null)
            if (request.Filter.Statuses.Any())
                products = products.Where(p => request.Filter.Statuses.Contains(p.Status));
        if (request.Filter.ProductId != null)
        {
            string productId = ((int)request.Filter.ProductId).ToString();
            products = products.Where(p => p.Id.ToString().StartsWith(productId));
        }
        return await products.OrderByDescending(p => p.Id).PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}