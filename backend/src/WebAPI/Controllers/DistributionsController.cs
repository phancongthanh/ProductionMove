using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Distributions.Commands.AddDistribution;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class DistributionsController : ApiControllerBase
{
    [HttpPost]
    //[Authorize(Policy = Schema.Role.Factory)]
    //[Authorize(Policy = Schema.Role.Distributor)]
    public async Task<ActionResult> Post([FromQuery] string factoryId, [FromQuery] string distributorId, [FromQuery] string productLineId, [FromQuery] int fromId, [FromQuery] int toId)
    {
        var command = new AddDistributionCommand(factoryId, distributorId, productLineId, fromId, toId);
        try
        {
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok(result) : BadRequest(result.Errors);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}