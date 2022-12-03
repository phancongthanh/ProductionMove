using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Distributors.Commands.ReturnToFactory;

[Authorize(Roles = Schema.Role.Distributor)]
public class ReturnToFactoryCommand : IRequest<Result>, ICurrentBuilding
{
    public int ProductId { get; }

    public string BuildingId { get; }

    public ReturnToFactoryCommand(int productId, string distributorId)
    {
        ProductId = productId;
        BuildingId = distributorId;
    }
}

public class ReturnToFactoryCommandHandler : IRequestHandler<ReturnToFactoryCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public ReturnToFactoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(ReturnToFactoryCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);

        product.Status = Domain.Enums.ProductStatus.Inventory;
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}