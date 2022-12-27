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
        var distributor = await _context.Distributors.AsNoTracking()
            .Include(d => d.Distributions)
            .Include(d => d.Products)
            .Include(d => d.Warranties)
            .Where(d => d.Id == request.BuildingId)
            .FirstAsync(cancellationToken: cancellationToken);

        var years = distributor.Distributions
            .Select(d => d.Time.Year)
            .Union(distributor.Products.Select(p => p.SaleDate?.Year).Where(y => y != null).OfType<int>())
            .Union(distributor.Warranties.Select(p => p.StartTime?.Year).Where(y => y != null).OfType<int>())
            .Distinct();

        var monthStatistics = new List<MonthProductStatistics<DistributorProductStatisticsItem>>();

        foreach (var year in years)
        {
            for (int i = 0; i < 12; i++)
            {
                var distributorStatistics = new DistributorProductStatisticsItem()
                {
                    Imported = distributor.Distributions
                        .Where(d => d.Time.Year == year)
                        .Where(d => d.Time.Month == i)
                        .Select(d => d.Amount)
                        .Sum(),
                    Sold = distributor.Products
                        .Where(p => p.SaleDate?.Year == year)
                        .Where(p => p.SaleDate?.Month == i)
                        .Count(),
                    Warranty = distributor.Warranties
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