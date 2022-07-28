using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinBoard.Domain.Migrations
{
    public partial class AddedDashboard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DashboardCharts",
                columns: table => new
                {
                    DashboardChartId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceId = table.Column<Guid>(type: "uuid", nullable: false),
                    SourceType = table.Column<int>(type: "integer", nullable: false),
                    ChartType = table.Column<int>(type: "integer", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModifyBy = table.Column<Guid>(type: "uuid", nullable: false),
                    DateOfCreation = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DateOfLastModification = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DashboardCharts", x => x.DashboardChartId);
                    table.ForeignKey(
                        name: "FK_DashboardCharts_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DashboardCharts_AccountId",
                table: "DashboardCharts",
                column: "AccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DashboardCharts");
        }
    }
}
