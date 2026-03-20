using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinBoard.Domain.Migrations
{
    public partial class AddFinancialGoals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinancialGoals",
                columns: table => new
                {
                    FinancialGoalId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    ResourceId = table.Column<Guid>(type: "uuid", nullable: true),
                    ResourceGroupId = table.Column<Guid>(type: "uuid", nullable: true),
                    TargetValue = table.Column<float>(type: "real", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModifyBy = table.Column<Guid>(type: "uuid", nullable: false),
                    DateOfCreation = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DateOfLastModification = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialGoals", x => x.FinancialGoalId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinancialGoals");
        }
    }
}
