using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Factories.Queries.FactoryProductStatistics;

[Authorize(Roles = Schema.Role.Factory)]
public class FactoryProductStatisticsQuery : IRequest<ProductStatistics<FactoryProductStatisticsItem>>, ICurrentBuilding
{
    public string BuildingId { get; private set; }

    public FactoryProductStatisticsQuery(string factoryId)
    {
        BuildingId = factoryId;
    }
}

public class FactoryProductStatisticsQueryHandler : IRequestHandler<FactoryProductStatisticsQuery, ProductStatistics<FactoryProductStatisticsItem>>
{
    private readonly IApplicationDbContext _context;

    public FactoryProductStatisticsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<ProductStatistics<FactoryProductStatisticsItem>> Handle(FactoryProductStatisticsQuery request, CancellationToken cancellationToken)
    {
        var distributions = await _context.Distributions.AsNoTracking()
            .Where(d => d.FactoryId == request.BuildingId)
            .ToListAsync(cancellationToken);
        var products = await _context.Products.AsNoTracking()
            .Where(p => p.FactoryId == request.BuildingId)
            .ToListAsync(cancellationToken);

        var years = distributions.Select(d => d.Time.Year)
            .Union(products.Select(p => p.DateOfManufacture.Year))
            .Distinct();

        var monthStatistics = new List<MonthProductStatistics<FactoryProductStatisticsItem>>();

        foreach (var year in years)
        {
            for (int i = 0; i < 12; i++)
            {
                var factoryStatistics = new FactoryProductStatisticsItem()
                {
                    Produced = products
                        .Where(p => p.DateOfManufacture.Year == year)
                        .Where(p => p.DateOfManufacture.Month == i)
                        .Count(),
                    Export = distributions
                        .Where(d => d.Time.Year == year)
                        .Where(d => d.Time.Month == i)
                        .Select(d => d.Amount)
                        .Sum()
                };
                monthStatistics.Add(new MonthProductStatistics<FactoryProductStatisticsItem>(year, i, factoryStatistics));
            }
        }

        return new ProductStatistics<FactoryProductStatisticsItem>(monthStatistics);
    }
}