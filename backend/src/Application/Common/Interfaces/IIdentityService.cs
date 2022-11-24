using ProductionMove.Application.Common.Models;

namespace ProductionMove.Application.Common.Interfaces;
public interface IIdentityService
{
    Task<User?> GetUserAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(Result Result, string UserId)> CreateUserAsync(User user, string password);

    Task<Result> DeleteUserAsync(string userId);

    Task<(Result Result, LoginResponse Response)> Login(LoginRequest request);

    Task<string> RefreshToken(string refreshToken, string accessToken);

    Task Logout(string tokenId);
}
