﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Distributors.Commands.ReturnToCustomer;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

[Authorize(Policy = Schema.Role.Distributor)]
public class DistributorsController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public DistributorsController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
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
}