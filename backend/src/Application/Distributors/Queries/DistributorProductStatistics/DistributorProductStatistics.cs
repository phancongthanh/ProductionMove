using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Factories.Queries.DistributorProductStatistics;

[Authorize(Roles = Schema.Role.Distributor)]
public class DistributorProductStatisticsQuery : IRequest<ProductStatistics<DistributorProductStatisticsItem>>, ICurrentBuilding
{
    public string BuildingId { get; private set; }

    public DistributorProductStatisticsQuery(string distributorId)
    {
        BuildingId = distributorId;
    }
}

public class DistributorProductStatisticsQueryHandler : IRequestHandler<DistributorProductStatisticsQuery, ProductStatistics<DistributorProductStatisticsItem>>
{
    private readonly IApplicationDbContext _context;

    public DistributorProductStatisticsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<ProductStatistics<DistributorProductStatisticsItem>> Handle(DistributorProductStatisticsQuery request, CancellationToken cancellationToken)
    {
        var distributions = await _context.Distributions.AsNoTracking()
            .Where(d => d.DistributorId == request.BuildingId)
            .ToListAsync(cancellationToken);
        var products = await _context.Products.AsNoTracking()
            .Where(p => p.DistributorId == request.BuildingId)
            .ToListAsync(cancellationToken);
        var warranties = await _context.Warranties.AsNoTracking()
            .Where(w => w.DistributorId == request.BuildingId)
            .ToListAsync(cancellationToken);

        var years = distributions.Select(d => d.Time.Year)
            .Union(products.Select(p => p.SaleDate?.Year).Where(y => y != null).OfType<int>())
            .Union(warranties.Select(p => p.StartTime?.Year).Where(y => y != null).OfType<int>())
            .Distinct()
            .Order();

        var monthStatistics = new List<MonthProductStatistics<DistributorProductStatisticsItem>>();

        foreach (var year in years)
        {
            for (int i = 0; i < 12; i++)
            {
                var distributorStatistics = new DistributorProductStatisticsItem()
                {
                    Imported = distributions
                        .Where(d => d.Time.Year == year)
                        .Where(d => d.Time.Month == i)
                        .Select(d => d.Amount)
                        .Sum(),
                    Sold = products
                        .Where(p => p.SaleDate?.Year == year)
                        .Where(p => p.SaleDate?.Month == i)
                        .Count(),
                    Warranty = warranties
                        .Where(p => p.StartTime?.Year == year)
                        .Where(p => p.StartTime?.Month == i)
                        .Count(),
                };
                monthStatistics.Add(new MonthProductStatistics<DistributorProductStatisticsItem>(year, i, distributorStatistics));
            }
        }

        return new ProductStatistics<DistributorProductStatisticsItem>(monthStatistics);
    }
}