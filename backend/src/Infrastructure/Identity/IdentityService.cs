using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Domain.ValueObjects;
using ProductionMove.Infrastructure.Persistence;

namespace ProductionMove.Infrastructure.Identity;
public class IdentityService : IIdentityService
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;
    private readonly ITokenProvider _tokenProvider;
    private readonly IDateTime _dateTime;

    public IdentityService(
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IAuthorizationService authorizationService,
        ITokenProvider tokenProvider,
        IDateTime dateTime)
    {
        _context = context;
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
        _tokenProvider = tokenProvider;
        _dateTime = dateTime;
    }

    public async Task<User?> GetUserAsync(string userId)
    {
        var applicationUser = await _userManager.Users.FirstAsync(u => u.Id == userId);

        return applicationUser?.ToUser();
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(User user, string password)
    {
        var applicationUser = new ApplicationUser
        {
            UserName = user.UserName,
            Name = user.UserName,
            PhoneNumber = user.Phone,
            Email = user.UserName,
            Role = user.Role,
            BuildingId = user.BuildingId,
        };

        var result = await _userManager.CreateAsync(applicationUser, password);
        if (result.Succeeded)
            result = await _userManager.AddToRoleAsync(applicationUser, applicationUser.Role);

        return (result.ToApplicationResult(), applicationUser.Id);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null ? await DeleteUserAsync(user) : Result.Success();
    }

    protected async Task<Result> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }

    public async Task<(Result Result, LoginResponse Response)> Login(LoginRequest request)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);
        if (user == null)
            return (Result.Failure(new[] { "Tài khoản không tồn tại!" }), null!);
        var result = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!result)
            return (Result.Failure(new[] { "Mật khẩu không chính xác!" }), null!);

        var tokenId = Guid.NewGuid().ToString();
        var token = new Token()
        {
            TokenId = tokenId,
            UserId = user.Id,
            CreatedTime = _dateTime.Now,
            RefreshToken = _tokenProvider.GenerateRefreshToken(user.ToUser(), tokenId),
            AccessToken = _tokenProvider.GenerateAccessToken(user.ToUser(), tokenId)
        };
        await _context.Tokens.AddAsync(token);
        await _context.SaveChangesAsync(new CancellationTokenSource().Token);

        var response = new LoginResponse(user.ToUser(), token.AccessToken, token.AccessToken);
        return (Result.Success(), response);
    }

    public async Task<string> RefreshToken(string refreshToken, string accessToken)
    {
        var token = await _context.Tokens.FirstAsync(x => x.RefreshToken == refreshToken);
        if (token == null) throw new NotFoundException();
        if (token.IsLocked) return string.Empty;
        if (token.AccessToken != accessToken)
        {
            token.IsLocked = true;
            await _context.SaveChangesAsync(default);
            return string.Empty;
        }
        var user = await _userManager.Users.SingleAsync(u => u.Id == token.UserId);
        token.AccessToken = _tokenProvider.GenerateAccessToken(user.ToUser(), token.TokenId);
        await _context.SaveChangesAsync(default);
        return token.AccessToken;
    }

    public async Task Logout(string tokenId)
    {
        var token = await _context.Tokens.SingleOrDefaultAsync(x => x.TokenId == tokenId);
        if (token != null)
            if (!token.IsLocked)
            {
                token.IsLocked = true;
                await _context.SaveChangesAsync(new CancellationTokenSource().Token);
            }
    }
}
