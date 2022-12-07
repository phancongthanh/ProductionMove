namespace ProductionMove.Domain.Entities;
public class Distributor : Building
{
    public virtual ICollection<Distribution> Distributions { set; get; } = new List<Distribution>();

    public virtual ICollection<Warranty> Warranties { set; get; } = new List<Warranty>();

    public virtual ICollection<Product> Products { set; get; } = new List<Product>();
}
