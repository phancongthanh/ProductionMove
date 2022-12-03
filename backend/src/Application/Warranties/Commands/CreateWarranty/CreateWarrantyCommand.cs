using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Warranties.Commands.CreateWarranty;

[Authorize(Roles = Schema.Role.Distributor)]
public class CreateWarrantyCommand : IRequest<Result>, ICurrentBuilding
{
    public int ProductId { get; }

    public string ServiceCenterId { get; }

    public string DistributorId { get; }

    public string BuildingId => DistributorId;

    public CreateWarrantyCommand(int productId, string distributorId, string serviceCenterId)
    {
        ProductId = productId;
        DistributorId = distributorId;
        ServiceCenterId = serviceCenterId;
    }
}

public class CreateWarrantyCommandHandler : IRequestHandler<CreateWarrantyCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateWarrantyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateWarrantyCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);
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
        
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}