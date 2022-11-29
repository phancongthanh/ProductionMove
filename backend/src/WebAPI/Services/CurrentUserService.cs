using System.Security.Claims;

using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.WebAPI.Services;
public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? BuildingId => _httpContextAccessor.HttpContext?.User?.FindFirstValue(Schema.BuildingId);
}
