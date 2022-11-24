using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class DistributorConfiguration : IEntityTypeConfiguration<Distributor>
{
    public void Configure(EntityTypeBuilder<Distributor> builder)
    {
        builder.ToTable(nameof(Distributor)).HasKey(d => d.Id);

        //builder.HasMany(d => d.Distributions).WithOne().HasForeignKey(d => d.DistributorId).OnDelete(DeleteBehavior.Cascade);
        //builder.HasMany(d => d.Warranties).WithOne().HasForeignKey(w => w.DistributorId).OnDelete(DeleteBehavior.Cascade);
    }
}
