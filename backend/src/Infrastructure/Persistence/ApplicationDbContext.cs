using System.Reflection;
using Duende.IdentityServer.EntityFramework.Options;
using MediatR;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Domain.Entities;
using ProductionMove.Infrastructure.Identity;
using ProductionMove.Infrastructure.Persistence.Interceptors;

namespace ProductionMove.Infrastructure.Persistence;
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    private readonly IMediator _mediator;
    private readonly EntitySaveChangesInterceptor _entitySaveChangesInterceptor;

    public DbSet<Factory> Factories => Set<Factory>();

    public DbSet<Distributor> Distributors => Set<Distributor>();

    public DbSet<ServiceCenter> ServiceCenters => Set<ServiceCenter>();

    public DbSet<ProductLine> ProductLines => Set<ProductLine>();

    public DbSet<Product> Products => Set<Product>();

    public DbSet<Distribution> Distributions => Set<Distribution>();

    public DbSet<Warranty> Warranties => Set<Warranty>();

    public DbSet<Token> Tokens => Set<Token>(); 

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IMediator mediator,
        EntitySaveChangesInterceptor entitySaveChangesInterceptor)
        : base(options)
    {
        _mediator = mediator;
        _entitySaveChangesInterceptor = entitySaveChangesInterceptor;
    }

    

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_entitySaveChangesInterceptor);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _mediator.DispatchDomainEvents(this);

        return await base.SaveChangesAsync(cancellationToken);
    }
}
