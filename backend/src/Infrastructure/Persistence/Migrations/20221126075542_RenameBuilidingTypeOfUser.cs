using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductionMove.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RenameBuilidingTypeOfUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BuildingType",
                table: "AspNetUsers",
                newName: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "AspNetUsers",
                newName: "BuildingType");
        }
    }
}
