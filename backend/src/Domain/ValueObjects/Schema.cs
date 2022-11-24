namespace ProductionMove.Domain.ValueObjects;
public static class Schema
{
    public const string BuildingType = "BuildingType";
    public const string BuildingId = "BuildingId";

    public static class Building
    {
        public const string Company = "Administrator";

        public const string Factory = "Factory";

        public const string Distributor = "Distributor";

        public const string ServiceCenter = "ServiceCenter";
    }

    public static class Role
    {
        public const string Administrator = "Administrator";

        public const string Factory = "Factory";

        public const string Distributor = "Distributor";

        public const string ServiceCenter = "ServiceCenter";

        public const string AuthenticatedUser = "AuthenticatedUser";
    }
}
