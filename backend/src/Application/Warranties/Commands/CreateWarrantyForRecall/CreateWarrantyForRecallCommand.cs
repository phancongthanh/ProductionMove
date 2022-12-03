using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Warranties.Commands.CreateWarrantyForRecall;

[Authorize(Roles = Schema.Role.Distributor)]
public class CreateWarrantyForRecallCommand : IRequest<Result>, ICurrentBuilding
{
    public string DistributorId { get; }

    public string ServiceCenterId { get; }

    public int FromProductId { get; }

    public int ToProductId { get; }

    public string BuildingId => DistributorId;

    public CreateWarrantyForRecallCommand(string distributorId, string serviceCenter, int fromProductId = 0, int toProductId = int.MaxValue)
    {
        DistributorId = distributorId;
        ServiceCenterId = serviceCenter;
        FromProductId = fromProductId;
        ToProductId = toProductId;
    }
}

public class CreateWarrantyForRecallCommandHandler : IRequestHandler<CreateWarrantyForRecallCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateWarrantyForRecallCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateWarrantyForRecallCommand request, CancellationToken cancellationToken)
    {
        var distributionIds = await _context.Distributions
            .Where(d => d.DistributorId == request.DistributorId)
            .Select(d => d.Id)
            .Order()
            .ToListAsync(cancellationToken);

        var products = await _context.Products
            .Where(p => p.Id >= request.FromProductId && p.Id <= request.ToProductId)
            .Where(p => p.DistributionId != null && distributionIds.Contains(p.DistributionId))
            .Where(p => p.Status == Domain.Enums.ProductStatus.Recall && p.Customer == null)
            .ToListAsync(cancellationToken);

        foreach (var product in products)
        {
            product.Status = Domain.Enums.ProductStatus.WaitingForWarranty;

            var warranty = new Warranty()
            {
                Id = Guid.NewGuid().ToString(),
                ProductId = product.Id,
                DistributorId = request.DistributorId,
                ServiceCenterId = request.ServiceCenterId,
                StartTime = null,
                CompletedTime = null,
                IsSuccessed = null
            };
            await _context.Warranties.AddAsync(warranty, cancellationToken);
        }

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}