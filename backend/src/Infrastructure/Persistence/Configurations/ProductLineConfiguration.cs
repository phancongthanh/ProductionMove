using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class ProductLineConfiguration : IEntityTypeConfiguration<ProductLine>
{
    public void Configure(EntityTypeBuilder<ProductLine> builder)
    {
        builder.ToTable(nameof(ProductLine)).HasKey(p => p.Id);

        builder.OwnsMany(p => p.Describes).WithOwner();
    }
}
