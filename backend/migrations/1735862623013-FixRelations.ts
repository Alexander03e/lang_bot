import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1735862623013 implements MigrationInterface {
    name = 'FixRelations1735862623013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "FK_8f1b96a30ff66e0cd5c5c2fd797"`);
        await queryRunner.query(`CREATE TABLE "users_languages_languages" ("usersId" integer NOT NULL, "languagesId" integer NOT NULL, CONSTRAINT "PK_f052c82e64486402006d5edace4" PRIMARY KEY ("usersId", "languagesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22abbee8a332e4c5e590cc2a79" ON "users_languages_languages" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2b1caf0c41f7394969203ae6c" ON "users_languages_languages" ("languagesId") `);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_3f75018aa783695bfd293f0dc26" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_languages_languages" ADD CONSTRAINT "FK_22abbee8a332e4c5e590cc2a79d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_languages_languages" ADD CONSTRAINT "FK_f2b1caf0c41f7394969203ae6ca" FOREIGN KEY ("languagesId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_languages_languages" DROP CONSTRAINT "FK_f2b1caf0c41f7394969203ae6ca"`);
        await queryRunner.query(`ALTER TABLE "users_languages_languages" DROP CONSTRAINT "FK_22abbee8a332e4c5e590cc2a79d"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_3f75018aa783695bfd293f0dc26"`);
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "userId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2b1caf0c41f7394969203ae6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22abbee8a332e4c5e590cc2a79"`);
        await queryRunner.query(`DROP TABLE "users_languages_languages"`);
        await queryRunner.query(`ALTER TABLE "languages" ADD CONSTRAINT "FK_8f1b96a30ff66e0cd5c5c2fd797" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
