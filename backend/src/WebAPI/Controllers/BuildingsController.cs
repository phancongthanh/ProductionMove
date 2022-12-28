using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Buildings.Commands.CreateBuiding;
using ProductionMove.Application.Buildings.Commands.UpdateBuiding;
using ProductionMove.Application.Buildings.Queries.GetBuildings;
using ProductionMove.Application.Common.Models;
using ProductionMove.Domain.Common;
using ProductionMove.Domain.Exceptions;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class BuildingsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<BuildingsModel>> Get()
    {
        try
        {
            var query = new GetBuildingsQuery();
            var buildings = await Mediator.Send(query);
            return Ok(buildings);
        }
        catch(Exception)
        {
            return BadRequest();
        }
    }


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
        catch (Exception)
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
            var command = new UpdateBuildingCommand((RoleSchema)type, building);
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
