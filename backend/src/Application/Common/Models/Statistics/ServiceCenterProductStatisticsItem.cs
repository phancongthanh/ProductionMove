namespace ProductionMove.Application.Common.Models.Statistics;

public class ServiceCenterProductStatisticsItem : ProductStatisticsItem<ServiceCenterProductStatisticsItem>
{
    public int Start { get; set; }

    public int Completed => Successed + Failded;

    public int Successed { get; set; }

    public int Failded { get; set; }


    public ServiceCenterProductStatisticsItem Add(ServiceCenterProductStatisticsItem value)
        => new() { Start = Start + value.Start, Successed = Successed + value.Successed, Failded = Failded + value.Failded };
}
