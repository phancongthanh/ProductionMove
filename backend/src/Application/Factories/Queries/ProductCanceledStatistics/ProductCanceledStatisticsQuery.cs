using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
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

    public ProductCanceledStatisticsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<ProductCanceledStatisticsData> Handle(ProductCanceledStatisticsQuery request, CancellationToken cancellationToken)
    {
        var distributors = await _context.Distributors.AsNoTracking()
            .Include(d => d.Products)
            .Where(d => d.Products.Any())
            .ToListAsync(cancellationToken);

        var data = new ProductCanceledStatisticsData();

        foreach (var distributor in distributors)
            data.Distributors.Add(new DistributorProductCanceled(distributor.Id,
                distributor.Products.GroupBy(
                    p => p.ProductLineId,
                    p => p,
                    (productLineId, p)
                        => new ProductLineProductCanceled(productLineId, p.Count(_p => _p.Status == Domain.Enums.ProductStatus.Canceled), p.Count())
                )
            ));

        return data;
    }
}