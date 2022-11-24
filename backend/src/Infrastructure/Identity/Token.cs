namespace ProductionMove.Infrastructure.Identity;
public class Token
{
    public string TokenId { get; set; }

    public string UserId { get; set; }

    public string RefreshToken { get; set; }

    public string AccessToken { get; set; }

    public DateTime CreatedTime { get; set; }

    public bool IsLocked { get; set; } = false;
}
