using MediatR;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Products.Commands.SellProduct;

[Authorize(Roles = Schema.Role.Distributor)]
public class SellProductCommand : IRequest<Result>
{
    public int ProductId { get; }

    public Customer Customer { get; }

    public SellProductCommand(int productId, Customer customer)
    {
        ProductId = productId;
        Customer = customer;
    }
}

public class SellProductCommandHandler : IRequestHandler<SellProductCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public SellProductCommandHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Result> Handle(SellProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);

        product.SaleDate = _dateTime.Now;
        product.Customer = request.Customer;
        product.Status = Domain.Enums.ProductStatus.Sold;

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}