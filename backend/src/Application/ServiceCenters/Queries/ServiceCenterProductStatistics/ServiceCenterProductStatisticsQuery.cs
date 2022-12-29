using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.ServiceCenters.Queries.ServiceCenterProductStatistics;

[Authorize(Roles = Schema.Role.ServiceCenter)]
public class ServiceCenterProductStatisticsQuery : IRequest<ProductStatistics<ServiceCenterProductStatisticsItem>>, ICurrentBuilding
{
    public string BuildingId { get; private set; }

    public ServiceCenterProductStatisticsQuery(string serviceCenterId)
    {
        BuildingId = serviceCenterId;
    }
}

public class ServiceCenterProductStatisticsQueryHandler : IRequestHandler<ServiceCenterProductStatisticsQuery, ProductStatistics<ServiceCenterProductStatisticsItem>>
{
    private readonly IApplicationDbContext _context;

    public ServiceCenterProductStatisticsQueryHandler(IApplicationDbContext context) => _context = context;

    public async Task<ProductStatistics<ServiceCenterProductStatisticsItem>> Handle(ServiceCenterProductStatisticsQuery request, CancellationToken cancellationToken)
    {
        var warranties = await _context.Warranties.AsNoTracking()
            .Where(w => w.ServiceCenterId == request.BuildingId)
            .ToListAsync(cancellationToken);

        var years = warranties.Select(w => w.StartTime?.Year)
            .Union(warranties.Select(p => p.CompletedTime?.Year))
            .Where(y => y != null).OfType<int>()
            .Distinct()
            .Order();

        var monthStatistics = new List<MonthProductStatistics<ServiceCenterProductStatisticsItem>>();

        foreach (var year in years)
        {
            for (int i = 0; i < 12; i++)
            {
                var serviceCenterStatistics = new ServiceCenterProductStatisticsItem()
                {
                    Start = warranties
                        .Where(w => w.StartTime?.Year == year)
                        .Where(w => w.StartTime?.Month == i)
                        .Count(),
                    Successed = warranties
                        .Where(w => w.IsSuccessed == true)
                        .Where(w => w.CompletedTime?.Year == year)
                        .Where(w => w.CompletedTime?.Month == i)
                        .Count(),
                    Failed = warranties
                        .Where(w => w.IsSuccessed == false)
                        .Where(w => w.CompletedTime?.Year == year)
                        .Where(w => w.CompletedTime?.Month == i)
                        .Count()
                };
                monthStatistics.Add(new MonthProductStatistics<ServiceCenterProductStatisticsItem>(year, i, serviceCenterStatistics));
            }
        }

        return new ProductStatistics<ServiceCenterProductStatisticsItem>(monthStatistics);
    }
}