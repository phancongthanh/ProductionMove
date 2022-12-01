using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Warranties.Commands.StartWarrantyProcess;

[Authorize(Roles = Schema.Role.ServiceCenter)]
public class StartWarrantyProcessCommand : IRequest<Result>, ICurrentBuilding
{
    public int ProductId { get; }

    public string BuildingId { get; }

    public StartWarrantyProcessCommand(int productId, string serviceCenterId)
    {
        ProductId = productId;
        BuildingId = serviceCenterId;
    }
}

public class StartWarrantyProcessCommandHandler : IRequestHandler<StartWarrantyProcessCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public StartWarrantyProcessCommandHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Result> Handle(StartWarrantyProcessCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);
        var warranty = await _context.Warranties
            .Where(w => w.ProductId == product.Id && w.StartTime == null)
            .FirstAsync(cancellationToken);

        product.Status = Domain.Enums.ProductStatus.Warranty;
        warranty.StartTime = _dateTime.Now;
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}