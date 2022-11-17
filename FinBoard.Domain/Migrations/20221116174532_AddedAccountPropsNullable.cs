using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinBoard.Domain.Migrations
{
    public partial class AddedAccountPropsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfFirstSnapshot",
                table: "Accounts",
                type: "timestamp without time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                defaultValue: null,
                oldType: "timestamp without time zone");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfFirstSnapshot",
                table: "Accounts",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldNullable: true);
        }
    }
}
