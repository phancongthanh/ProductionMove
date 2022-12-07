using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Distributions.Commands.AddDistribution;

[Authorize(Roles = Schema.Role.Factory)]
[Authorize(Roles = Schema.Role.Distributor)]
public class AddDistributionCommand : IRequest<Result>
{
    public string FactoryId { get; }

    public string DistributorId { get; }

    public string ProductLineId { get; }

    public int FromId { get; }

    public int ToId { get; }

    public AddDistributionCommand(string factoryId , string distributorId, string productLineId, int fromId, int toId)
    {
        FactoryId = factoryId;
        DistributorId = distributorId;
        ProductLineId = productLineId;
        FromId = fromId;
        ToId = toId;
    }
}

public class AddDistributionCommandHandler : IRequestHandler<AddDistributionCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public AddDistributionCommandHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Result> Handle(AddDistributionCommand request, CancellationToken cancellationToken)
    {
        var factory = await _context.Factories
            .Include(f => f.Products
                .Where(p => p.ProductLineId == request.ProductLineId)
                .Where(p => p.Id >= request.FromId && p.Id <= request.ToId)
                .Where(p => p.Status == Domain.Enums.ProductStatus.JustProduced))
            .SingleAsync(f => f.Id == request.FactoryId, cancellationToken: cancellationToken);
        var products = factory.Products;

        var distributor = await _context.Distributors.FindAsync(new object?[] { request.DistributorId }, cancellationToken: cancellationToken);
        if (distributor == null) throw new NotFoundException(nameof(Distributor), request.DistributorId);

        var distribution = new Distribution()
        {
            Id = Guid.NewGuid().ToString(),
            Time = _dateTime.Now,
            Amount = products.Count,
            ProductLineId = request.ProductLineId,
            DistributorId = request.DistributorId,
            Distributor = distributor,
            FactoryId = request.FactoryId,
            Factory = factory
        };
        distributor.Distributions.Add(distribution);
        factory.Distributions.Add(distribution);
        await _context.Distributions.AddAsync(distribution, cancellationToken);
        foreach (var product in products)
        {
            product.Status = Domain.Enums.ProductStatus.JustImported;
            product.DistributionId = distribution.Id;
            product.DistributorId = distributor.Id;
        }

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}