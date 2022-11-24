using MediatR;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Events;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.ProductLines.Commands.CreateProductLine;

[Authorize(Roles = Schema.Role.Administrator)]
public class CreateProductLineCommand : IRequest<bool>
{
    public ProductLine ProductLine { get; }

    public CreateProductLineCommand(ProductLine productLine)
    {
        ProductLine = productLine;
    }
}

public class CreateProductLineCommandHandler : IRequestHandler<CreateProductLineCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public CreateProductLineCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(CreateProductLineCommand request, CancellationToken cancellationToken)
    {
        var productLine = request.ProductLine;

        productLine.Id = Guid.NewGuid().ToString();

        productLine.AddDomainEvent(new CreatedProductLineEvent(productLine));

        await _context.ProductLines.AddAsync(productLine, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}