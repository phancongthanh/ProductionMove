namespace ProductionMove.Application.Common.Models;
public class Account
{
    public User User { get; set; }

    public string Password { get; set; } = string.Empty;
}

public class AccountModel
{
    public string UserId { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}