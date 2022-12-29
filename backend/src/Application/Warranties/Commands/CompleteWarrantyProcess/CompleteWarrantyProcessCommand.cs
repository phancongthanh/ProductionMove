using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Exceptions;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.Enums;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Warranties.Commands.CompleteWarrantyProcess;

[Authorize(Roles = Schema.Role.ServiceCenter)]
public class CompleteWarrantyProcessCommand : IRequest<Result>, ICurrentBuilding
{
    public int ProductId { get; }

    public bool IsSuccessed { get; }

    public string BuildingId { get; }

    public CompleteWarrantyProcessCommand(int productId, bool isSuccessed, string serviceCenterId)
    {
        ProductId = productId;
        IsSuccessed = isSuccessed;
        BuildingId = serviceCenterId;
    }
}

public class CompleteWarrantyProcessCommandHandler : IRequestHandler<CompleteWarrantyProcessCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public CompleteWarrantyProcessCommandHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Result> Handle(CompleteWarrantyProcessCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(new object?[] { request.ProductId }, cancellationToken: cancellationToken);
        if (product == null) throw new NotFoundException(nameof(Product), request.ProductId);
        var warranty = await _context.Warranties
            .Where(w => w.ProductId == product.Id && (w.IsSuccessed == null || w.CompletedTime == null))
            .FirstAsync(cancellationToken);

        if (request.IsSuccessed)
        {
            product.Status = product.Customer != null ? ProductStatus.WaitingForCustomer : ProductStatus.JustImported;
            warranty.IsSuccessed = true;
            warranty.CompletedTime = _dateTime.Now;
            await _context.SaveChangesAsync(cancellationToken);
        }
        else
        {
            product.Status = ProductStatus.WaitingForFactory;
            warranty.IsSuccessed = false;
            warranty.CompletedTime = _dateTime.Now;
            await _context.SaveChangesAsync(cancellationToken);
        }

        return Result.Success();
    }
}