using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Distributions.Commands.AddDistribution;

namespace ProductionMove.WebAPI.Controllers;

public class DistributionsController : ApiControllerBase
{
    public async Task<ActionResult> Post([FromQuery] string distributorId, [FromQuery] int fromId, [FromQuery] int toId)
    {
        var command = new AddDistributionCommand(distributorId, fromId, toId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok(result) : BadRequest(result.Errors);
    }
}
