namespace ProductionMove.Domain.Events;

public class UpdatedProductLineEvent : BaseEvent
{
    public ProductLine ProductLine { get; private set; }

    public UpdatedProductLineEvent(ProductLine productLine)
    {
        ProductLine = productLine;
    }
}
