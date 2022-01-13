using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CorrectedPKInInvitings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitings_AspNetUsers_UserId",
                table: "Invitings");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitings_InvitingStatuses_InvitingStatusId",
                table: "Invitings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitings",
                table: "Invitings");

            migrationBuilder.AlterColumn<bool>(
                name: "IsAccepted",
                table: "Invitings",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Invitings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Invitings",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "InvitingStatusId",
                table: "Invitings",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitings",
                table: "Invitings",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invitings_InvitingStatusId",
                table: "Invitings",
                column: "InvitingStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitings_AspNetUsers_UserId",
                table: "Invitings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitings_InvitingStatuses_InvitingStatusId",
                table: "Invitings",
                column: "InvitingStatusId",
                principalTable: "InvitingStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitings_AspNetUsers_UserId",
                table: "Invitings");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitings_InvitingStatuses_InvitingStatusId",
                table: "Invitings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitings",
                table: "Invitings");

            migrationBuilder.DropIndex(
                name: "IX_Invitings_InvitingStatusId",
                table: "Invitings");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Invitings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsAccepted",
                table: "Invitings",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "InvitingStatusId",
                table: "Invitings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Invitings",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitings",
                table: "Invitings",
                columns: new[] { "InvitingStatusId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Invitings_AspNetUsers_UserId",
                table: "Invitings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitings_InvitingStatuses_InvitingStatusId",
                table: "Invitings",
                column: "InvitingStatusId",
                principalTable: "InvitingStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
