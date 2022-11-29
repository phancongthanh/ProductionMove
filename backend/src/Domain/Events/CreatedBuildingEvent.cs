namespace ProductionMove.Domain.Events;

public class CreatedBuildingEvent : BaseEvent
{
    public Building Building { get; private set; }

    public CreatedBuildingEvent(Building building)
    {
        Building = building;
    }
}
