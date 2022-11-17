using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinBoard.Domain.Migrations
{
    public partial class AddedAccountProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfFirstSnapshot",
                table: "Accounts",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PeriodicityOfSnapshotsInDays",
                table: "Accounts",
                type: "integer",
                nullable: false,
                defaultValue: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfFirstSnapshot",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "PeriodicityOfSnapshotsInDays",
                table: "Accounts");
        }
    }
}
