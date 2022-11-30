﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.ProductLines.Commands.CreateProductLine;
using ProductionMove.Application.ProductLines.Commands.UpdateProductLine;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class ProductLinesController : ApiControllerBase
{
    [HttpPost]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Post([FromBody] ProductLine productLine)
    {
        var command = new CreateProductLineCommand(productLine);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpPatch]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Patch([FromQuery]string productLineId, [FromForm] IEnumerable<ProductLineInfo> describes)
    {
        var command = new UpdateProductLineCommand(productLineId, describes);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}