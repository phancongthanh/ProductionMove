using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Models.Statistics;
using ProductionMove.Application.Factories.Commands.CancelProduct;
using ProductionMove.Application.Factories.Queries.FactoryProductStatistics;
using ProductionMove.Application.Factories.Queries.ProductCanceledStatistics;
using ProductionMove.Application.Factories.Queries.ProductExportAnalysis;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

[Authorize(Policy = Schema.Role.Factory)]
public class FactoryController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public FactoryController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ProductStatistics<FactoryProductStatisticsItem>>> StatusProductStatistics()
    {
        var factoryId = _currentUser.BuildingId;
        if (factoryId == null) return Unauthorized();

        var query = new FactoryProductStatisticsQuery(factoryId);
        try
        {
            var statistics = await Mediator.Send(query);
            return Ok(statistics);
        }
        catch (Exception) { return BadRequest(); }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ProductCanceledStatisticsData>> ProductCanceledRateStatistics()
    {
        var factoryId = _currentUser.BuildingId;
        if (factoryId == null) return Unauthorized();

        var query = new ProductCanceledStatisticsQuery(factoryId);
        try
        {
            var statistics = await Mediator.Send(query);
            return Ok(statistics);
        }
        catch (Exception) { return BadRequest(); }
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<ProductAnalysis>> ProductExportAnalysis()
    {
        var factoryId = _currentUser.BuildingId;
        if (factoryId == null) return Unauthorized();

        var query = new ProductExportAnalysisQuery(factoryId);
        try
        {
            var analysis = await Mediator.Send(query);
            return Ok(analysis);
        }
        catch (Exception) { return BadRequest(); }
    }

    [HttpPatch("[action]")]
    public async Task<ActionResult> CancelProduct([FromQuery] int productId)
    {
        var factoryId = _currentUser.BuildingId;
        if (factoryId == null) return Unauthorized();

        var command = new CancelProductCommand(productId, factoryId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
