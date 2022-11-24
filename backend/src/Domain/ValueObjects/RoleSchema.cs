namespace ProductionMove.Domain.ValueObjects;
public class RoleSchema : ValueObject
{
    static RoleSchema()
    {
    }

    private RoleSchema()
    {
    }

    private RoleSchema(string role)
    {
        Role = role;
    }

    public static RoleSchema From(string role)
    {
        var roleSchema = new RoleSchema { Role = role };

        if (!SupportedRoleSchemas.Contains(roleSchema))
        {
            throw new UnsupportedRoleSchemaException(role);
        }

        return roleSchema;
    }

    public static RoleSchema Administrator => new("Administrator");

    public static RoleSchema Factory => new("Factory");

    public static RoleSchema Distributor => new("Distributor");

    public static RoleSchema ServiceCenter => new("ServiceCenter");

    public string Role { get; private set; } = "Administrator";

    public static implicit operator string(RoleSchema role)
    {
        return role.ToString();
    }

    public static explicit operator RoleSchema(string code)
    {
        return From(code);
    }

    public override string ToString()
    {
        return Role;
    }

    protected static IEnumerable<RoleSchema> SupportedRoleSchemas
    {
        get
        {
            yield return Administrator;
            yield return Factory;
            yield return Distributor;
            yield return ServiceCenter;
        }
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Role;
    }
}
