using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Factories.Commands.CancelProduct;

[Authorize(Roles = Schema.Role.Factory)]
public class CancelProductCommand : IRequest<Result>, ICurrentBuilding
{
    public int ProductId { get; }

    public string BuildingId { get; }

    public CancelProductCommand(int productId, string factoryId)
    {
        ProductId = productId;
        BuildingId = factoryId;
    }
}

public class CancelProductCommandHandler : IRequestHandler<CancelProductCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CancelProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CancelProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);

        product.Status = Domain.Enums.ProductStatus.Canceled;
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}