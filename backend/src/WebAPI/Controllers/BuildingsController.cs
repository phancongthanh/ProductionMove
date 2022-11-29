using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Buildings.Commands.CreateBuiding;
using ProductionMove.Domain.Common;
using ProductionMove.Domain.Exceptions;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class BuildingsController : ApiControllerBase
{

    [HttpPost]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Post([FromQuery] string type, [FromBody] Building building)
    {
        try
        {
            var command = new CreateBuildingCommand((RoleSchema)type, building);
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (UnsupportedRoleSchemaException)
        {
            return BadRequest();
        }
    }

    [HttpPut]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Put([FromQuery] string type, [FromBody] Building building)
    {
        try
        {
            var command = new CreateBuildingCommand((RoleSchema)type, building);
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (UnsupportedRoleSchemaException)
        {
            return BadRequest();
        }
    }
}
