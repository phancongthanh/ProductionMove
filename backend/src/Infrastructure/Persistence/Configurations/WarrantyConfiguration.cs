using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class WarrantyConfiguration : IEntityTypeConfiguration<Warranty>
{
    public void Configure(EntityTypeBuilder<Warranty> builder)
    {
        builder.ToTable(nameof(Warranty)).HasKey(w => w.Id);
        builder.Property(w => w.Id).ValueGeneratedOnAdd();

        builder.HasOne(w => w.Product).WithMany(p => p.Warranties).HasForeignKey(w => w.ProductId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(w => w.Distributor).WithMany(d => d.Warranties).HasForeignKey(w => w.DistributorId).OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(w => w.ServiceCenter).WithMany(s => s.Warranties).HasForeignKey(w => w.ServiceCenterId).OnDelete(DeleteBehavior.Cascade);
    }
}
