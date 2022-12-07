using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductionMove.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddDistributorIdToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DistributorId",
                table: "Product",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Product_DistributorId",
                table: "Product",
                column: "DistributorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Distributor_DistributorId",
                table: "Product",
                column: "DistributorId",
                principalTable: "Distributor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Distributor_DistributorId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_DistributorId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "DistributorId",
                table: "Product");
        }
    }
}
