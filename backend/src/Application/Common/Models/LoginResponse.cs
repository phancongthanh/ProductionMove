namespace ProductionMove.Application.Common.Models;

public class LoginResponse
{
    public User User { get; set; }

    public string RefreshToken { get; set; } = string.Empty;

    public string AccessToken { get; set; } = string.Empty;

    public LoginResponse(User user, string refreshToken, string accessToken)
    {
        User = user;
        RefreshToken = refreshToken;
        AccessToken = accessToken;
    }
}
