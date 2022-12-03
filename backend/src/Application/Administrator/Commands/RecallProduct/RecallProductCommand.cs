using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Enums;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Administrator.Commands.RecallProduct;

[Authorize(Roles = Schema.Role.Administrator)]
public class RecallProductCommand : IRequest<Result>
{
    public string ProductLineId { get; }

    public int FromId { get; }

    public int ToId { get; }

    public RecallProductCommand(string productLineId, int fromId = 0, int toId = int.MaxValue)
    {
        ProductLineId = productLineId;
        FromId = fromId;
        ToId = toId;
    }
}

public class RecallProductCommandHandler : IRequestHandler<RecallProductCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public RecallProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(RecallProductCommand request, CancellationToken cancellationToken)
    {
        var status = new[] { ProductStatus.JustImported, ProductStatus.Sold, ProductStatus.WaitingForCustomer };

        var products = await _context.Products
            .Where(p => p.ProductLineId == request.ProductLineId)
            .Where(p => p.Id >= request.FromId && p.Id <= request.ToId)
            .Where(p => status.Contains(p.Status))
            .ToListAsync(cancellationToken);

        foreach (var product in products) product.Status = ProductStatus.Recall;

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}