using Microsoft.AspNetCore.Identity;
using ProductionMove.Application.Common.Models;

namespace ProductionMove.Infrastructure.Identity;
public class ApplicationUser : IdentityUser
{
    public string Name { get; set; } = string.Empty;

    public string BuildingType { get; set; } = string.Empty;

    public string BuildingId { get; set; } = string.Empty;
}

public static class ApplicationUserExtensions
{
    public static User ToUser(this ApplicationUser applicationUser)
    {
        return new User()
        {
            UserId = applicationUser.Id,
            UserName = applicationUser.UserName,
            Name = applicationUser.Name,
            Phone = applicationUser.PhoneNumber,
            Email = applicationUser.Email,
            BuildingType = applicationUser.BuildingType,
            BuildingId = applicationUser.BuildingId,
        };
    }
}