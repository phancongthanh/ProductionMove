using Microsoft.AspNetCore.Identity;
using ProductionMove.Application.Common.Models;

namespace ProductionMove.Infrastructure.Identity;
public class ApplicationUser : IdentityUser
{
    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string BuildingId { get; set; } = string.Empty;
}

public static class ApplicationUserExtensions
{
    public static User ToUser(this ApplicationUser applicationUser)
    {
        return new User()
        {
            UserId = applicationUser.Id,
            UserName = applicationUser.UserName ?? string.Empty,
            Name = applicationUser.Name,
            Phone = applicationUser.PhoneNumber ?? string.Empty,
            Email = applicationUser.Email ?? string.Empty,
            Role = applicationUser.Role,
            BuildingId = applicationUser.BuildingId,
        };
    }
}