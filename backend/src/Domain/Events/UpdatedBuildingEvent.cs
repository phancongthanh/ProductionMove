namespace ProductionMove.Domain.Events;

public class UpdatedBuildingEvent : BaseEvent
{
    public Building Building { get; private set; }

    public UpdatedBuildingEvent(Building building)
    {
        Building = building;
    }
}
