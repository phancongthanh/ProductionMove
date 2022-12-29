using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Warranties.Commands.CompleteWarrantyProcess;
using ProductionMove.Application.Warranties.Commands.CreateWarranty;
using ProductionMove.Application.Warranties.Commands.CreateWarrantyForRecall;
using ProductionMove.Application.Warranties.Commands.StartWarrantyProcess;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class WarrantiesController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public WarrantiesController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    [HttpPost("Customer")]
    [Authorize(Policy = Schema.Role.Distributor)]
    public async Task<ActionResult> CreateWarrantyForCustomer([FromQuery] string serviceCenterId, [FromQuery] int productId)
    {
        var distributorId = _currentUser.BuildingId;
        if (distributorId == null) return Unauthorized();

        var command = new CreateWarrantyCommand(productId, distributorId, serviceCenterId);
        try
        {
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPost("Recall")]
    [Authorize(Policy = Schema.Role.Distributor)]
    public async Task<ActionResult> CreateWarrantyForRecall([FromQuery] string serviceCenterId, [FromQuery] int fromProductId = 0, [FromQuery] int toProductId = int.MaxValue)
    {
        var distributorId = _currentUser.BuildingId;
        if (distributorId == null) return Unauthorized();

        var command = new CreateWarrantyForRecallCommand(distributorId, serviceCenterId, fromProductId, toProductId);
        try
        {
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPatch("Start")]
    [Authorize(Policy = Schema.Role.ServiceCenter)]
    public async Task<ActionResult> Start([FromQuery] int productId)
    {
        var serviceCenterId = _currentUser.BuildingId;
        if (serviceCenterId == null) return Unauthorized();

        var command = new StartWarrantyProcessCommand(productId, serviceCenterId);
        try
        {
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPatch("Complete")]
    [Authorize(Policy = Schema.Role.ServiceCenter)]
    public async Task<ActionResult> Complete([FromQuery] int productId, [FromQuery] bool isSuccessed)
    {
        var serviceCenterId = _currentUser.BuildingId;
        if (serviceCenterId == null) return Unauthorized();

        var command = new CompleteWarrantyProcessCommand(productId, isSuccessed, serviceCenterId);
        try
        {
            var result = await Mediator.Send(command);
            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }
        catch (Exception) { return BadRequest(); }
    }
}
