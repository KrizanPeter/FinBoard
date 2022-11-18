using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinBoard.Domain.Migrations
{
    public partial class SnapshotRefactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateOfChange",
                table: "Snapshots",
                newName: "DateOfSnapshot");

            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Snapshots",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateOfSnapshot",
                table: "Snapshots",
                newName: "DateOfChange");

            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Snapshots",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);
        }
    }
}
