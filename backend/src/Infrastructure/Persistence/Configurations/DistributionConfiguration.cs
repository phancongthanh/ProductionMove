using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class DistributionConfiguration : IEntityTypeConfiguration<Distribution>
{
    public void Configure(EntityTypeBuilder<Distribution> builder)
    {
        builder.ToTable(nameof(Distribution)).HasKey(d => d.Id);

        builder.HasOne<ProductLine>().WithMany().HasForeignKey(d => d.ProductLineId).OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(d => d.Factory).WithMany(f => f.Distributions).HasForeignKey(d => d.FactoryId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(d => d.Distributor).WithMany(d => d.Distributions).HasForeignKey(d => d.DistributorId).OnDelete(DeleteBehavior.Cascade);
    }
}
