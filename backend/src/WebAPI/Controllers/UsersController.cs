using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Controllers;

public class UsersController : ApiControllerBase
{
    private readonly IIdentityService _identityService;
    private readonly ICurrentUserService _currentUser;
    private readonly IApplicationDbContext _context;

    public UsersController(IIdentityService identityService, ICurrentUserService currentUser, IApplicationDbContext context)
    {
        _identityService = identityService;
        _currentUser = currentUser;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult> Get([FromQuery] string? userId = null)
    {
        if (userId != null)
        {
            var user = await _identityService.GetUserAsync(userId);
            return user == null ? NotFound() : Ok(user);
        }
        return Ok(await _identityService.GetUsersAsync());
    }

    [HttpPost]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult<int>> Post([FromBody] Account account)
    {
        switch (account.User.Role)
        {
            case Schema.Role.Administrator:
                account.User.BuildingId = string.Empty;
                break;
            case Schema.Role.Factory:
                if (!_context.Factories.Any(f => f.Id != account.User.BuildingId))
                    return BadRequest(new[] { "Id cơ sở không hợp lệ" });
                break;
            case Schema.Role.Distributor:
                if (!_context.Distributors.Any(d => d.Id != account.User.BuildingId))
                    return BadRequest(new[] { "Id cơ sở không hợp lệ" });
                break;
            case Schema.Role.ServiceCenter:
                if (!_context.ServiceCenters.Any(s => s.Id != account.User.BuildingId))
                    return BadRequest(new[] { "Id cơ sở không hợp lệ" });
                break;
            default: return BadRequest(new[] { "Phân quyền không hợp lệ" });
        }
        var result = await _identityService.CreateUserAsync(account.User, account.Password);
        return result.Result.Succeeded ? Ok(result.UserId) : BadRequest(result.Result.Errors);
    }

    [HttpPatch]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Patch([FromBody] AccountModel account)
    {
        if (account.UserId == null) return BadRequest();
        var result = await _identityService.UpdateUserAsync(account.UserId, account.Password);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpPut]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Put([FromBody] User user)
    {
        var result = await _identityService.UpdateUserAsync(user);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpDelete]
    [Authorize(Policy = Schema.Role.Administrator)]
    public async Task<ActionResult> Delete([FromQuery] string userId)
    {
        var result = await _identityService.DeleteUserAsync(userId);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }
}
