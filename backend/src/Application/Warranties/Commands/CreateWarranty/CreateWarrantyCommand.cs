using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Warranties.Commands.CreateWarranty;

[Authorize(Roles = Schema.Role.Distributor)]
[Authorize(Roles = Schema.Role.ServiceCenter)]
public class CreateWarrantyCommand : IRequest<Result>
{
    public int ProductId { get; }

    public string ServiceCenterId { get; }

    public CreateWarrantyCommand(int productId, string serviceCenterId)
    {
        ProductId = productId;
        ServiceCenterId = serviceCenterId;
    }
}

public class CreateWarrantyCommandHandler : IRequestHandler<CreateWarrantyCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public CreateWarrantyCommandHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Result> Handle(CreateWarrantyCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);

        var distributorId = (await _context.Distributions.FindAsync(new object?[] { product.DistributionId }, cancellationToken: cancellationToken))?.DistributorId;
        if (distributorId == null) throw new InvalidOperationException();

        var warranty = new Warranty()
        {
            Id = Guid.NewGuid().ToString(),
            ProductId = product.Id,
            DistributorId = distributorId,
            ServiceCenterId = request.ServiceCenterId,
            StartTime = _dateTime.Now,
            CompletedTime = null,
            IsSuccessed = null
        };

        await _context.Warranties.AddAsync(warranty, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}