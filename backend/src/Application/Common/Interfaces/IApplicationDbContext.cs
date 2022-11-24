using Microsoft.EntityFrameworkCore;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<Factory> Factories { get; }

    DbSet<Distributor> Distributors { get; }

    DbSet<ServiceCenter> ServiceCenters { get; }

    DbSet<ProductLine> ProductLines { get; }

    DbSet<Product> Products { get; }

    DbSet<Distribution> Distributions { get; }

    DbSet<Warranty> Warranties { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
