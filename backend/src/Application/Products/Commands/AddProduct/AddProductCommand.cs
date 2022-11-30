using MediatR;
using ProductionMove.Application.Common.Interfaces;
using ProductionMove.Application.Common.Models;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.Entities;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Products.Commands.AddProduct;

[Authorize(Roles = Schema.Role.Factory)]
public class AddProductCommand : IRequest<Result>, ICurrentUser
{
    public string FactoryId { get; }

    public string ProductLineId { get; }

    public int FromId { get; }

    public int ToId { get; }

    public string BuildingId => FactoryId;

    public string CurrentUserId { get; set; } = string.Empty;

    public AddProductCommand(string factoryId, string productLineId, int fromId, int toId)
    {
        FactoryId = factoryId;
        ProductLineId = productLineId;
        FromId = fromId;
        ToId = toId;
    }
}

public class AddProductCommandHandler : IRequestHandler<AddProductCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IDateTime _dateTime;

    public AddProductCommandHandler(IApplicationDbContext context, IDateTime dateTime)
    {
        _context = context;
        _dateTime = dateTime;
    }

    public async Task<Result> Handle(AddProductCommand request, CancellationToken cancellationToken)
    {
        var list = new List<Product>();
        for (int id = request.FromId; id <= request.ToId; id++)
        {
            var product = new Product()
            {
                Id = id,
                Status = Domain.Enums.ProductStatus.JustProduced,
                DateOfManufacture = _dateTime.Now,
                SaleDate = null,
                ProductLineId = request.ProductLineId,
                FactoryId = request.FactoryId,
                DistributionId = null,
                Customer = null
            };
            list.Add(product);
        }
        await _context.Products.AddRangeAsync(list, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}