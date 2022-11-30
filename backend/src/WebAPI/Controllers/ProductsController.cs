﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Products.Commands.AddProduct;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class ProductsController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public ProductsController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    [HttpPost]
    [Authorize(Policy = Schema.Role.Factory)]
    public async Task<ActionResult> Post([FromQuery] string productLineId, [FromQuery] int fromId, [FromQuery] int toId)
    {
        var factoryId = _currentUser.BuildingId;
        if (factoryId == null) return Unauthorized();
        var command = new AddProductCommand(factoryId, productLineId, fromId, toId)
        {
            CurrentUserId = _currentUser.UserId ?? string.Empty
        };
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}