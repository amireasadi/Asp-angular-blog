using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Blog.API.Migrations
{
    /// <inheritdoc />
    public partial class FixColumnTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PublisheDate",
                table: "BlogPosts",
                newName: "PublishedDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PublishedDate",
                table: "BlogPosts",
                newName: "PublisheDate");
        }
    }
}
