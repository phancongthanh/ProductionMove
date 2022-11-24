namespace ProductionMove.Domain.Entities;
public class ServiceCenter : Building
{
    public virtual ICollection<Warranty> Warranties { get; set; } = new List<Warranty>();
}
