namespace ProductionMove.Application.Common.Models.Statistics;

public class ServiceCenterProductStatisticsItem : ProductStatisticsItem<ServiceCenterProductStatisticsItem>
{
    public int Start { get; set; }

    public int Completed => Successed + Failed;

    public int Successed { get; set; }

    public int Failed { get; set; }


    public ServiceCenterProductStatisticsItem Add(ServiceCenterProductStatisticsItem value)
        => new() { Start = Start + value.Start, Successed = Successed + value.Successed, Failed = Failed + value.Failed };
}
