namespace ProductionMove.Application.Common.Interfaces;

public interface ICurrentUserService
{
    string? UserId { get; }

    string? BuildingId { get; }
}
