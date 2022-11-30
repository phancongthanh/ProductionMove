using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Warranties.Commands.CreateWarranty;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class WarrantiesController : ApiControllerBase
{
    [HttpPost]
    [Authorize(Policy = Schema.Role.Distributor)]
    [Authorize(Policy = Schema.Role.ServiceCenter)]
    public async Task<ActionResult> Post([FromQuery] string serviceCenterId, [FromQuery] int productId)
    {
        var command = new CreateWarrantyCommand(productId, serviceCenterId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
