import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateImagesTable1696339085200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images", // 테이블 이름
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar(255)",
            isUnique: true,
          },
          {
            name: "url",
            type: "varchar(255)",
          },
          {
            name: "previewUrl",
            type: "varchar(255)",
          },
          {
            name: "author",
            type: "varchar(255)",
            isUnique: true,
          },
          {
            name: "createdAt",
            type: "datetime(6)",
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "updatedAt",
            type: "datetime(6)",
            default: "CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}