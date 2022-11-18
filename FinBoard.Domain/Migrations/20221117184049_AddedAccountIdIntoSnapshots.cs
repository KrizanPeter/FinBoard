using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinBoard.Domain.Migrations
{
    public partial class AddedAccountIdIntoSnapshots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AccountId",
                table: "Snapshots",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Snapshots");
        }
    }
}
