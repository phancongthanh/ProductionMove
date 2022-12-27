namespace ProductionMove.Application.Common.Models.Statistics;

public class FactoryProductStatisticsItem : ProductStatisticsItem<FactoryProductStatisticsItem>
{
    public int Produced { get; set; }

    public int Export { get; set; }

    public FactoryProductStatisticsItem Add(FactoryProductStatisticsItem value)
        => new() { Produced = Produced + value.Produced, Export = Export + value.Export };
}