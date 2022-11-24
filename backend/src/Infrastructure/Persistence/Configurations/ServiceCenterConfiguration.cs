using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Infrastructure.Persistence.Configurations;
public class ServiceCenterConfiguration : IEntityTypeConfiguration<ServiceCenter>
{
    public void Configure(EntityTypeBuilder<ServiceCenter> builder)
    {
        builder.ToTable(nameof(ServiceCenter)).HasKey(sc => sc.Id);

        //builder.HasMany(sc => sc.Warranties).WithOne().HasForeignKey(w => w.ServiceCenterId).OnDelete(DeleteBehavior.Cascade);
    }
}
