import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectAndTagsRelation1757720178720 implements MigrationInterface {
    name = 'AddProjectAndTagsRelation1757720178720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "projectsId" integer, CONSTRAINT "PK_cc4c953ce52d1444e42947ea0df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "frontendUrl" character varying, "backendUrl" character varying, "liveUrl" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project_tag" ADD CONSTRAINT "FK_7edbd4375aa2cf30d58b8f24294" FOREIGN KEY ("projectsId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_tag" DROP CONSTRAINT "FK_7edbd4375aa2cf30d58b8f24294"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_tag"`);
    }

}
