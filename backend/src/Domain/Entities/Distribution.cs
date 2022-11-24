namespace ProductionMove.Domain.Entities;
public class Distribution : BaseEntity
{
    public string Id { get; set; } = string.Empty;

    public DateTime Time { get; set; }

    public int Amount { get; set; }

    public string ProductLineId { get; set; } = string.Empty;

    public string DistributorId { get; set; } = string.Empty;

    public string FactoryId { get; set; } = string.Empty;

    public virtual Factory Factory { get; set; }

    public virtual Distributor Distributor { get; set; }
}
