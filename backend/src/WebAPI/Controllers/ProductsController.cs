using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Mappings;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Products.Commands.AddProduct;
using ProductionMove.Application.Products.Commands.SellProduct;
using ProductionMove.Application.Products.Queries.GetProducts;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Enums;
using ProductionMove.Domain.ValueObjects;
using static ProductionMove.Application.Products.Queries.GetProducts.GetProductsQuery;

namespace ProductionMove.WebAPI.Controllers;

public class ProductsController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUser;

    public ProductsController(ICurrentUserService currentUser)
    {
        _currentUser = currentUser;
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<PaginatedList<Product>>> Filter([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20, [FromBody] ProductFilter? filter = null)
    {
        var buildingId = _currentUser.BuildingId;
        var buildingType = User?.FindFirstValue(Schema.RoleType);
        buildingType ??= Schema.Role.Administrator;
        var query = filter != null
            ? new GetProductsQuery(buildingType, buildingId, pageNumber, pageSize, filter)
            : new GetProductsQuery(buildingType, buildingId, pageNumber, pageSize);
        try
        {
            var products = await Mediator.Send(query);
            return Ok(products);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedList<Product>>> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var buildingId = _currentUser.BuildingId;
        var buildingType = User?.FindFirstValue(Schema.RoleType);
        buildingType ??= Schema.Role.Administrator;
        var query = new GetProductsQuery(buildingType, buildingId, pageNumber, pageSize);
        try
        {
            var products = await Mediator.Send(query);
            return Ok(products);
        }
        catch (Exception)
        {
            return BadRequest();
        }
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

    [HttpPatch("[action]")]
    [Authorize(Policy = Schema.Role.Distributor)]
    public async Task<ActionResult> Sell([FromQuery] int productId, [FromBody] Customer customer)
    {
        var command = new SellProductCommand(productId, customer);
        var result = await Mediator.Send(command);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
