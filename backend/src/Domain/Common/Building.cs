namespace ProductionMove.Domain.Common;
public class Building : BaseEntity
{
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}
