namespace ProductionMove.Application.Common.Models.Statistics;

public class DistributorProductStatisticsItem : ProductStatisticsItem<DistributorProductStatisticsItem>
{
    public int Imported { get; set; }


    public int Sold { get; set; }

    public int Warranty { get; set; }

    public DistributorProductStatisticsItem Add(DistributorProductStatisticsItem value)
        => new() { Imported = Imported + value.Imported, Sold = Sold + value.Sold, Warranty = Warranty + value.Warranty };
}
