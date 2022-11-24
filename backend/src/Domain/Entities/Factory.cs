namespace ProductionMove.Domain.Entities;
public class Factory : Building
{
    public virtual ICollection<Distribution> Distributions { get; set; } = new List<Distribution>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
