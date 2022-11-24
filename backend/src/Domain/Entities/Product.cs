﻿namespace ProductionMove.Domain.Entities;
public class Product : BaseEntity
{
    public int Id { get; set; }

    public ProductStatus Status { get; set; }

    public DateTime DateOfManufacture { get; set; }

    public string ProductLineId { get; set; } = string.Empty;

    public string FactoryId { get; set; } = string.Empty;

    public string DistributionId { get; set; } = string.Empty;
}
