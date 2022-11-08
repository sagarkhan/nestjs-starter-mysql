import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTest1667930889139 implements MigrationInterface {
    name = 'migrationTest1667930889139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ADD "migration_test" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "migration_test"`);
    }

}
