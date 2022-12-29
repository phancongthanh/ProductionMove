using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Factories.Queries.ProductExportAnalysis;

[Authorize(Roles = Schema.Role.Factory)]
public class ProductExportAnalysisQuery : IRequest<ProductAnalysis>, ICurrentBuilding
{
    public string BuildingId { get; private set; }

    public ProductExportAnalysisQuery(string factoryId)
    {
        BuildingId = factoryId;
    }
}

public class ProductExportAnalysisQueryHandler : IRequestHandler<ProductExportAnalysisQuery, ProductAnalysis>
{
    private readonly IApplicationDbContext _context;

    public ProductExportAnalysisQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<ProductAnalysis> Handle(ProductExportAnalysisQuery request, CancellationToken cancellationToken)
    {
        var distributions = await _context.Distributions.AsNoTracking()
            .Where(d => d.FactoryId == request.BuildingId)
            .ToListAsync(cancellationToken);

        var years = distributions.Select(d => d.Time.Year).Distinct().Order();

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
                    var monthValue = distributions.Where(d => d.Time.Year == year && d.Time.Month == month).Select(d => d.Amount).Sum();
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