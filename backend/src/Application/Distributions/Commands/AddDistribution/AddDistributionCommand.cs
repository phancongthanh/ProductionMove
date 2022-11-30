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
    public string DistributorId { get; }

    public int FromId { get; }

    public int ToId { get; }

    public AddDistributionCommand(string distributorId, int fromId, int toId)
    {
        DistributorId = distributorId;
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
        var products = await _context.Products.Where(p => p.Id >= request.FromId && p.Id <= request.ToId)
            .ToListAsync(cancellationToken);
        
        var factoryId = products.Select(p => p.FactoryId).Distinct().First();
        var factory = await _context.Factories.FindAsync(new object?[] { factoryId }, cancellationToken: cancellationToken);
        if (factory == null) throw new NotFoundException(nameof(Factory), factoryId);

        var distributor = await _context.Distributors.FindAsync(new object?[] { request.DistributorId }, cancellationToken: cancellationToken);
        if (distributor == null) throw new NotFoundException(nameof(Distributor), request.DistributorId);

        var distribution = new Distribution()
        {
            Id = Guid.NewGuid().ToString(),
            Time = _dateTime.Now,
            Amount = products.Count,
            ProductLineId = products.First().ProductLineId,
            DistributorId = distributor.Id,
            Distributor = distributor,
            FactoryId = factoryId,
            Factory = factory
        };
        distributor.Distributions.Add(distribution);
        factory.Distributions.Add(distribution);
        await _context.Distributions.AddAsync(distribution, cancellationToken);
        foreach (var product in products) product.DistributionId = distribution.Id;

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}