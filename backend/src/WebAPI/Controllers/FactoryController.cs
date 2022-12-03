using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Factories.Commands.CancelProduct;
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

    [HttpPost("[action]")]
    public async Task<ActionResult> CancelProduct([FromQuery] int productId)
    {
        var factoryId = _currentUser.BuildingId;
        if (factoryId == null) return Unauthorized();

        var command = new CancelProductCommand(productId, factoryId);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
