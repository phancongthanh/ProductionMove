using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;
using static ProductionMove.Application.Common.Models.Statistics.ProductCanceledStatisticsData;

namespace ProductionMove.Application.Factories.Queries.ProductCanceledStatistics;

[Authorize(Roles = Schema.Role.Factory)]
public class ProductCanceledStatisticsQuery : IRequest<ProductCanceledStatisticsData>, ICurrentBuilding
{
    public string BuildingId { get; private set; }

    public ProductCanceledStatisticsQuery(string factoryId)
    {
        BuildingId = factoryId;
    }
}

public class ProductCanceledStatisticsQueryHandler : IRequestHandler<ProductCanceledStatisticsQuery, ProductCanceledStatisticsData>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ProductCanceledStatisticsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProductCanceledStatisticsData> Handle(ProductCanceledStatisticsQuery request, CancellationToken cancellationToken)
    {
        var data = new ProductCanceledStatisticsData()
        {
            Distributors = (await _context.Distributors.AsNoTracking()
                .OrderBy(d => d.Id)
                .ToListAsync(cancellationToken))
                .Select(d => _mapper.Map<DistributorModel>(d))
                .ToList()
        };
        var productLines = await _context.ProductLines.ToListAsync(cancellationToken);

        foreach (var productLine in productLines)
        {
            var productLineStatistics = new ProductLineProductCanceled(productLine.Id);
            foreach (var distributor in data.Distributors)
            {
                var products = await _context.Products
                    .Where(p => p.FactoryId == request.BuildingId)
                    .Where(p => p.ProductLineId == productLine.Id)
                    .Where(p => p.DistributorId == distributor.Id)
                    .Select(p => p.Status)
                    .ToListAsync(cancellationToken);
                if (products.Count > 0)
                {
                    var canceledCount = products.Count(p => p == Domain.Enums.ProductStatus.Canceled);
                    productLineStatistics.DistributorRates.Add(1.0f * canceledCount / products.Count);
                }
                else productLineStatistics.DistributorRates.Add(0);
            }
            data.ProductLines.Add(productLineStatistics);
        }
        return data;
    }
}