using ProductionMove.Application.Common.Models;

namespace ProductionMove.Application.Common.Interfaces;
public interface IIdentityService
{
    // User
    Task<User?> GetUserAsync(string userId);

    Task<IEnumerable<User>> GetUsersAsync();

    Task<(Result Result, string UserId)> CreateUserAsync(User user, string password);

    Task<Result> UpdateUserAsync(User user);

    Task<Result> UpdateUserAsync(string userId, string password);

    Task<Result> DeleteUserAsync(string userId);

    // Authorize

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    // Identity
    Task<(Result Result, LoginResponse Response)> Login(LoginRequest request);

    Task<string> RefreshToken(string refreshToken, string accessToken);

    Task Logout(string tokenId);
}
