namespace ProductionMove.Application.Common.Security;
public interface ICurrentUser
{
    string CurrentUserId { get; }

    string BuildingId { get; }
}
