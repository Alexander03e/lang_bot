import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1735862747181 implements MigrationInterface {
    name = 'FixRelations1735862747181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "tgId" character varying NOT NULL, "username" character varying NOT NULL, "first_name" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "words" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "translation" character varying NOT NULL, "description" character varying NOT NULL, "languageId" integer, "userId" integer, CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id")); COMMENT ON COLUMN "words"."word" IS 'Слово'; COMMENT ON COLUMN "words"."translation" IS 'Перевод слова'; COMMENT ON COLUMN "words"."description" IS 'Описание'`);
        await queryRunner.query(`CREATE TABLE "users_languages_languages" ("usersId" integer NOT NULL, "languagesId" integer NOT NULL, CONSTRAINT "PK_f052c82e64486402006d5edace4" PRIMARY KEY ("usersId", "languagesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22abbee8a332e4c5e590cc2a79" ON "users_languages_languages" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2b1caf0c41f7394969203ae6c" ON "users_languages_languages" ("languagesId") `);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_a609b3a068366e66693b9106506" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_3f75018aa783695bfd293f0dc26" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_languages_languages" ADD CONSTRAINT "FK_22abbee8a332e4c5e590cc2a79d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_languages_languages" ADD CONSTRAINT "FK_f2b1caf0c41f7394969203ae6ca" FOREIGN KEY ("languagesId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_languages_languages" DROP CONSTRAINT "FK_f2b1caf0c41f7394969203ae6ca"`);
        await queryRunner.query(`ALTER TABLE "users_languages_languages" DROP CONSTRAINT "FK_22abbee8a332e4c5e590cc2a79d"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_3f75018aa783695bfd293f0dc26"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_a609b3a068366e66693b9106506"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2b1caf0c41f7394969203ae6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22abbee8a332e4c5e590cc2a79"`);
        await queryRunner.query(`DROP TABLE "users_languages_languages"`);
        await queryRunner.query(`DROP TABLE "words"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "languages"`);
    }

}
