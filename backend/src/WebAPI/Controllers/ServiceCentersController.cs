using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.ServiceCenters.Queries.ServiceCenterProductStatistics;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

[Authorize(Policy = Schema.Role.ServiceCenter)]
public class ServiceCenterController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public ServiceCenterController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ProductStatistics<ServiceCenterProductStatisticsItem>>> StatusProductStatistics()
    {
        var serviceCenterId = _currentUser.BuildingId;
        if (serviceCenterId == null) return Unauthorized();

        var query = new ServiceCenterProductStatisticsQuery(serviceCenterId);
        try
        {
            var statistics = await Mediator.Send(query);
            return Ok(statistics);
        }
        catch (Exception) { return BadRequest(); }
    }
}
