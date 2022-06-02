using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dell_Asessment.Migrations
{
    public partial class I : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PromotedDocuments");

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    DocumentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DocumentName = table.Column<string>(type: "Varchar(100)", nullable: false),
                    Department = table.Column<string>(type: "Varchar(10)", nullable: false),
                    InsertedOn = table.Column<DateTime>(type: "DateTime", nullable: false),
                    DocFileName = table.Column<string>(type: "Varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.DocumentId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.CreateTable(
                name: "PromotedDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocFile = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    DocumentName = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromotedDocuments", x => x.Id);
                });
        }
    }
}
