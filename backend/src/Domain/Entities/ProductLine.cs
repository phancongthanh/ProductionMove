namespace ProductionMove.Domain.Entities;

public class ProductLineInfo
{
    public string Property { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;
}

public class ProductLine : BaseEntity
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int WarrantyPeriod { get; set; }

    public virtual ICollection<ProductLineInfo> Describes { get; set; } = new List<ProductLineInfo>();
}
