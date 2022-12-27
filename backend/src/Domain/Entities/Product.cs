namespace ProductionMove.Domain.Entities;

public class Customer
{
    public string Phone { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
}

public class Product : BaseEntity
{
    public int Id { get; set; }

    public ProductStatus Status { get; set; }

    public DateTime DateOfManufacture { get; set; }

    public DateTime? SaleDate { get; set; } = null;

    public string ProductLineId { get; set; } = string.Empty;

    public string FactoryId { get; set; } = string.Empty;

    public string? DistributorId { get; set; } = null;

    public string? DistributionId { get; set; } = null;

    public virtual Customer? Customer { get; set; } = null;

    public virtual ICollection<Warranty> Warranties { get; set; } = new List<Warranty>();
}
