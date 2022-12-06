using ProductionMove.Application.Common.Mappings;
using ProductionMove.Domain.Entities;

namespace ProductionMove.Application.Common.Models;

public class FactoryModel : IMapFrom<Factory>
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}

public class DistributorModel : IMapFrom<Distributor>
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}

public class ServiceCenterModel : IMapFrom<ServiceCenter>
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}

public class BuildingsModel
{
    public IEnumerable<FactoryModel> Factories { get; set; } = Enumerable.Empty<FactoryModel>();

    public IEnumerable<DistributorModel> Distributors { get; set; } = Enumerable.Empty<DistributorModel>();

    public IEnumerable<ServiceCenterModel> ServiceCenters { get; set; } = Enumerable.Empty<ServiceCenterModel>();
}
