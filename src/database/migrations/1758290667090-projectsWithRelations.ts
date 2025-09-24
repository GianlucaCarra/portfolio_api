import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectsWithRelations1758290667090 implements MigrationInterface {
    name = 'ProjectsWithRelations1758290667090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "publicId" character varying NOT NULL, "imageUrl" character varying NOT NULL, "projectId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "frontendUrl" character varying, "backendUrl" character varying, "liveUrl" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_tags" ("projectId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_348a788aabc2b5440dbc0153f60" PRIMARY KEY ("projectId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eabf9838b75eb417af9ccd37bf" ON "project_tags" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f32b78c2affb2ff0556eee81b2" ON "project_tags" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_63c8a589bd02b3525546ac70795" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_63c8a589bd02b3525546ac70795"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f32b78c2affb2ff0556eee81b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eabf9838b75eb417af9ccd37bf"`);
        await queryRunner.query(`DROP TABLE "project_tags"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
