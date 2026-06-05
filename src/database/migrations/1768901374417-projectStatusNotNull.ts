import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectStatusNotNull1768901374417 implements MigrationInterface {
    name = 'ProjectStatusNotNull1768901374417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "status" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
    }

}
