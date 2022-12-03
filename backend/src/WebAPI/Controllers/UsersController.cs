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

    public UsersController(IIdentityService identityService, ICurrentUserService currentUser)
    {
        _identityService = identityService;
        _currentUser = currentUser;
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
    public async Task<ActionResult<int>> Post([FromBody] (User User, string Password) account)
    {
        var result = await _identityService.CreateUserAsync(account.User, account.Password);
        return result.Result.Succeeded ? Ok(result.UserId) : BadRequest(result.Result.Errors);
    }

    [HttpPatch]
    [Authorize(Policy = Schema.Role.AuthenticatedUser)]
    public async Task<ActionResult> Patch([FromQuery] string password)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();
        var result = await _identityService.UpdateUserAsync(userId, password);
        return result.Succeeded ? Ok() : BadRequest(result.Errors);
    }

    [HttpPut]
    [Authorize(Policy = Schema.Role.AuthenticatedUser)]
    public async Task<ActionResult> Put([FromBody] User user)
    {
        var userId = _currentUser.UserId;
        if (userId == null) return Unauthorized();
        user.UserId = userId;

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
