using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using Microsoft.AspNetCore.Authorization;

namespace ProductionMove.WebAPI.Controllers;

public class AccountController : ApiControllerBase
{
    private readonly IIdentityService _identityService;

    public AccountController(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    [HttpPost("[action]")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var (result, response) = await _identityService.Login(request);
        return result.Succeeded ? Ok(response) : BadRequest(result.Errors);
    }

    [HttpDelete("[action]")]
    [Authorize]
    public async Task<ActionResult> Logout()
    {
        var tokenId = User.FindFirst("TokenId")?.Value;
        if (tokenId == null) return BadRequest();
        await _identityService.Logout(tokenId);
        return Ok();
    }

    [HttpGet("[action]")]
    [Authorize(Policy = "RefreshToken")]
    public async Task<ActionResult<string>> GetAccessToken(string oldAccessToken)
    {
        var refreshToken = await HttpContext.GetTokenAsync(JwtBearerDefaults.AuthenticationScheme, "access_token");
        //var refreshToken = HttpContext.Request.Headers.
        if (refreshToken == null) return Unauthorized();
        var accessToken = await _identityService.RefreshToken(refreshToken, oldAccessToken);
        return string.IsNullOrEmpty(accessToken) ? Ok(accessToken) : BadRequest();
    }
}
