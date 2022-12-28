using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Infrastructure.Identity;
public class TokenProvider : ITokenProvider
{
    private readonly JwtBearerOptions _jwtBearerOptions;
    private readonly IDateTime _dateTime;
    public TokenProvider(IOptionsMonitor<JwtBearerOptions> jwtBearerOptions, IDateTime dateTime)
    {
        _jwtBearerOptions = jwtBearerOptions.Get(JwtBearerDefaults.AuthenticationScheme);
        _dateTime = dateTime;
    }

    public string GenerateAccessToken(User user, string tokenId)
    {
        var claims = new[] {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.NameIdentifier, user.UserId),
            new Claim("TokenId", tokenId),
            new Claim("Kind", "AccessToken"),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(Schema.RoleType, user.Role),
            new Claim(Schema.BuildingId, user.BuildingId)
        };

        return GenerateToken(_dateTime.Now.AddMinutes(15), claims);
    }

    public string GenerateRefreshToken(User user, string tokenId)
    {
        var claims = new[] {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.NameIdentifier, user.UserId),
            new Claim("TokenId", tokenId),
            new Claim("Kind", "RefreshToken"),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(Schema.RoleType, user.Role),
            new Claim(Schema.BuildingId, user.BuildingId)
        };

        return GenerateToken(_dateTime.Now.AddMinutes(60), claims);
    }

    protected string GenerateToken(DateTime time, IEnumerable<Claim> claims)
    {
        string issuer = _jwtBearerOptions.TokenValidationParameters.ValidIssuer;
        string audience = _jwtBearerOptions.TokenValidationParameters.ValidAudience;
        var key = _jwtBearerOptions.TokenValidationParameters.IssuerSigningKey;
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var securityToken = new JwtSecurityToken(issuer, audience, claims, expires: time, signingCredentials: signIn);
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return token;
    }
}
