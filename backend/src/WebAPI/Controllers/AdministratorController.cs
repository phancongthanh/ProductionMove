using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Administrator.Commands.RecallProduct;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

[Authorize(Policy = Schema.Role.Administrator)]
public class AdministratorController : ApiControllerBase
{
    [HttpPost("[action]")]
    public async Task<ActionResult> RecallProduct([FromQuery] string productLineId)
    {
        var command = new RecallProductCommand(productLineId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
