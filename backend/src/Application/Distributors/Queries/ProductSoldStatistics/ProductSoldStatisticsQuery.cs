using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Distributors.Queries.ProductSoldStatistics;

[Authorize(Roles = Schema.Role.Distributor)]
public class ProductSoldAnalysisQuery : IRequest<ProductAnalysis>, ICurrentBuilding
{
    public string BuildingId { get; private set; }

    public ProductSoldAnalysisQuery(string distributorId)
    {
        BuildingId = distributorId;
    }
}

public class ProductSoldAnalysisQueryHandler : IRequestHandler<ProductSoldAnalysisQuery, ProductAnalysis>
{
    private readonly IApplicationDbContext _context;

    public ProductSoldAnalysisQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<ProductAnalysis> Handle(ProductSoldAnalysisQuery request, CancellationToken cancellationToken)
    {
        var products = await _context.Products.AsNoTracking()
            .Where(p => p.DistributorId == request.BuildingId)
            .Where(p => p.SaleDate != null)
            .ToListAsync(cancellationToken);

        var years = products.Select(d => d.SaleDate?.Year).Where(y => y != null).OfType<int>().Distinct().Order();

        var analysis = new ProductAnalysis();

        foreach (var year in years)
        {
            var previousYear = analysis.YearAnalyses.LastOrDefault(a => a.Year == year - 1);
            var yearValue = 0;
            for (int quarter = 0; quarter < 4; quarter++)
            {
                var previousQuarter = analysis.QuarterAnalyses
                    .LastOrDefault(a => quarter == 0 ? (a.Year == year - 1 && a.Quarter == 3) : (a.Year == year && a.Quarter == quarter - 1));
                var quarterValue = 0;
                for (int month = quarter * 3; month < (quarter + 1) * 3; month++)
                {
                    var previousMonth = analysis.MonthAnalysis
                        .LastOrDefault(a => month == 0 ? (a.Year == year - 1 && a.Month == 11) : (a.Year == year && a.Month == month - 1));
                    var monthValue = products.Where(p => p.SaleDate?.Year == year && p.SaleDate?.Month == month).Count();
                    analysis.MonthAnalysis.Add(new MonthAnalysis(year, month, previousMonth == null ? 0 : previousMonth.Value, monthValue));
                    quarterValue += monthValue;
                }
                analysis.QuarterAnalyses.Add(new QuarterAnalysis(year, quarter, previousQuarter == null ? 0 : previousQuarter.Value, quarterValue));
                yearValue += quarterValue;
            }
            analysis.YearAnalyses.Add(new YearAnalysis(year, previousYear == null ? 0 : previousYear.Value, yearValue));
        }

        analysis.YearAnalyses.OrderBy(a => a.Year);
        analysis.QuarterAnalyses.OrderBy(a => a.Year).OrderBy(a => a.Quarter);
        analysis.MonthAnalysis.OrderBy(a => a.Year).OrderBy(a => a.Month);

        return analysis;
    }
}