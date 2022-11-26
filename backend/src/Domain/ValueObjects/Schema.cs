namespace ProductionMove.Domain.ValueObjects;
public static class Schema
{
    public const string RoleType = "Role";
    public const string BuildingId = "BuildingId";

    public static class Role
    {
        public const string Administrator = "Administrator";
        
        public const string Company = "Administrator";

        public const string Factory = "Factory";

        public const string Distributor = "Distributor";

        public const string ServiceCenter = "ServiceCenter";

        public const string AuthenticatedUser = "AuthenticatedUser";
    }
}
