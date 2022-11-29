namespace ProductionMove.Domain.Events;

public class CreatedProductLineEvent : BaseEvent
{
    public ProductLine ProductLine { get; private set; }

    public CreatedProductLineEvent(ProductLine productLine)
    {
        ProductLine = productLine;
    }
}
