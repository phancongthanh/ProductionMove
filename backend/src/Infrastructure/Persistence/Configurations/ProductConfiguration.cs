using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable(nameof(Product)).HasKey(p => p.Id);

        builder.HasOne<ProductLine>().WithMany().HasForeignKey(p => p.ProductLineId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne<Factory>().WithMany(f => f.Products).HasForeignKey(p => p.FactoryId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne<Distributor>().WithMany(d => d.Products).HasForeignKey(p => p.DistributorId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne<Distribution>().WithMany().HasForeignKey(p => p.DistributionId).OnDelete(DeleteBehavior.Cascade);
        builder.OwnsOne(p => p.Customer, customer =>
        {
            customer.WithOwner();
            customer.ToTable(nameof(Customer));
        });
    }
}
