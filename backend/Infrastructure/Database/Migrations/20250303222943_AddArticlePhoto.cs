using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddArticlePhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Size",
                table: "Files",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Articles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_PhotoId",
                table: "Articles",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Files_PhotoId",
                table: "Articles",
                column: "PhotoId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Files_PhotoId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_PhotoId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Articles");

            migrationBuilder.AlterColumn<int>(
                name: "Size",
                table: "Files",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
