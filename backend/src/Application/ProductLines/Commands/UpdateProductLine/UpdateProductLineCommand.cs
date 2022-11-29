using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Events;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.ProductLines.Commands.UpdateProductLine;

[Authorize(Roles = Schema.Role.Administrator)]
public class UpdateProductLineCommand : IRequest<Result>
{
    public string ProductLineId { get; }

    public IEnumerable<ProductLineInfo> Describes { get; }

    public UpdateProductLineCommand(string productLineId, IEnumerable<ProductLineInfo> describes)
    {
        ProductLineId = productLineId;
        Describes = describes;
    }
}

public class UpdateProductLineCommandHandler : IRequestHandler<UpdateProductLineCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public UpdateProductLineCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(UpdateProductLineCommand request, CancellationToken cancellationToken)
    {
        var productLine = await _context.ProductLines.FindAsync(new object?[] { request.ProductLineId, cancellationToken }, cancellationToken: cancellationToken);

        if (productLine == null) throw new NotFoundException(nameof(ProductLine), request.ProductLineId);

        productLine.Describes = request.Describes.ToList();

        productLine.AddDomainEvent(new UpdatedProductLineEvent(productLine));

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}