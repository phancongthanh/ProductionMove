namespace ProductionMove.Domain.Exceptions;
public class UnsupportedRoleSchemaException : Exception
{
    public UnsupportedRoleSchemaException(string role)
        : base("$\"Role Schema \\\"{role}\\\" is unsupported.\"")
    {
    }
}