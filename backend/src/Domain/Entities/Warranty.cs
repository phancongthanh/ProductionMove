namespace ProductionMove.Domain.Entities;
public class Warranty : BaseEntity
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string DistributorId { get; set; } = string.Empty;

    public string ServiceCenterId { get; set; } = string.Empty;

    public DateTime StartTime { get; set; }

    public DateTime CompletedTime { get; set; }

    public virtual Product Product { get; set; }

    public virtual Distributor Distributor { get; set; }

    public virtual ServiceCenter ServiceCenter { set; get; }
}
