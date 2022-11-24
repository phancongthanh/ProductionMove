using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class FactoryConfiguration : IEntityTypeConfiguration<Factory>
{
    public void Configure(EntityTypeBuilder<Factory> builder)
    {
        builder.ToTable(nameof(Factory)).HasKey(b => b.Id);

        //builder.HasMany(b => b.Distributions).WithOne().HasForeignKey(d => d.FactoryId).OnDelete(DeleteBehavior.Cascade);
        //builder.HasMany(b => b.Products).WithOne().HasForeignKey(p => p.FactoryId).OnDelete(DeleteBehavior.Cascade);
    }
}
