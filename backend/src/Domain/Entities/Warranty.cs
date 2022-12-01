namespace ProductionMove.Domain.Entities;
public class Warranty : BaseEntity
{
    public string Id { get; set; } = string.Empty;

    public int ProductId { get; set; }

    public string DistributorId { get; set; } = string.Empty;

    public string ServiceCenterId { get; set; } = string.Empty;

    public DateTime? StartTime { get; set; } = null;

    public DateTime? CompletedTime { get; set; } = null;

    public bool? IsSuccessed { get; set; } = null;

    public virtual Product Product { get; set; }

    public virtual Distributor Distributor { get; set; }

    public virtual ServiceCenter ServiceCenter { set; get; }
}
