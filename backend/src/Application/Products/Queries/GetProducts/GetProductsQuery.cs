using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Mappings;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Products.Queries.GetProducts;

public class GetProductsQuery : IRequest<PaginatedList<Product>>, ICurrentBuilding
{
    public string Role { get; }

    public string? BuildingId { get; }

    public int PageNumber { get; }
    
    public int PageSize { get; }

    public GetProductsQuery(string role, string? buildingId, int pageNumber, int pageSize)
    {
        Role = role;
        BuildingId = buildingId;
        PageNumber = pageNumber;
        PageSize = pageSize;
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
                products = _context.Factories.AsNoTracking()
                    .Include(f => f.Products)
                    .ThenInclude(p => p.Warranties)
                    .Where(f => f.Id == request.BuildingId)
                    .SelectMany(f => f.Products);
                break;
            case Schema.Role.Distributor:
                products = _context.Distributors.AsNoTracking()
                    .Include(d => d.Products)
                    .ThenInclude(p => p.Warranties)
                    .Where(d => d.Id == request.BuildingId)
                    .SelectMany(d => d.Products);
                break;
            case Schema.Role.ServiceCenter:
                var productIds = await _context.ServiceCenters.AsNoTracking()
                        .Include(s => s.Warranties)
                        .Where(s => s.Id == request.BuildingId)
                        .SelectMany(s => s.Warranties)
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
        return await products.OrderByDescending(p => p.Id).PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}