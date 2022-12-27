using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.Distributors.Commands.ReturnToCustomer;
using ProductionMove.Application.Distributors.Commands.ReturnToFactory;
using ProductionMove.Application.Distributors.Queries.ProductSoldStatistics;
using ProductionMove.Application.Factories.Queries.DistributorProductStatistics;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

[Authorize(Policy = Schema.Role.Distributor)]
public class DistributorController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public DistributorController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ProductStatistics<DistributorProductStatisticsItem>>> StatusProductStatistics()
    {
        var distributorId = _currentUser.BuildingId;
        if (distributorId == null) return Unauthorized();

        var query = new DistributorProductStatisticsQuery(distributorId);
        try
        {
            var statistics = await Mediator.Send(query);
            return Ok(statistics);
        }
        catch (Exception) { return BadRequest(); }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ProductAnalysis>> ProductSoldAnalysis()
    {
        var distributorId = _currentUser.BuildingId;
        if (distributorId == null) return Unauthorized();

        var query = new ProductSoldAnalysisQuery(distributorId);
        try
        {
            var analysis = await Mediator.Send(query);
            return Ok(analysis);
        }
        catch (Exception) { return BadRequest(); }
    }

    [HttpPatch("[action]")]
    public async Task<ActionResult> ReturnToCustomer([FromQuery] int productId)
    {
        var distributorId = _currentUser.BuildingId;
        if (distributorId == null) return Unauthorized();

        var command = new ReturnToCustomerCommand(productId, distributorId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpPatch("[action]")]
    public async Task<ActionResult> ReturnToFactory([FromQuery] int productId)
    {
        var distributorId = _currentUser.BuildingId;
        if (distributorId == null) return Unauthorized();

        var command = new ReturnToFactoryCommand(productId, distributorId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
