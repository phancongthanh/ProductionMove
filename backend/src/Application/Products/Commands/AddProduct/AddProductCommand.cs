using MediatR;
using ProductionMove.Application.Common.Security;
using ProductionMove.Domain.ValueObjects;

namespace ProductionMove.Application.Products.Commands.AddProduct;

[Authorize(Roles = Schema.Role.Factory)]
public class AddProductCommand : IRequest<bool>
{
    public string FactoryId { get; }

    public string ProductLineId { get; }

    public IEnumerable<int> Ids { get; }

    public AddProductCommand(string factoryId, string productLineId, IEnumerable<int> ids)
    {
        FactoryId = factoryId;
        ProductLineId = productLineId;
        Ids = ids;
    }
}
