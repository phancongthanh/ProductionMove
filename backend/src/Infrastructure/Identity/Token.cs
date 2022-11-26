namespace ProductionMove.Infrastructure.Identity;
public class Token
{
    public string TokenId { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;

    public string RefreshToken { get; set; } = string.Empty;

    public string AccessToken { get; set; } = string.Empty;

    public DateTime CreatedTime { get; set; }

    public bool IsLocked { get; set; } = false;
}
