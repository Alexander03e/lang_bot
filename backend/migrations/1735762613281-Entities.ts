import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1735762613281 implements MigrationInterface {
    name = 'Entities1735762613281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "words" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "translation" character varying NOT NULL, "description" character varying NOT NULL, "languageId" integer, CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id")); COMMENT ON COLUMN "words"."word" IS 'Слово'; COMMENT ON COLUMN "words"."translation" IS 'Перевод слова'; COMMENT ON COLUMN "words"."description" IS 'Описание'`);
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "words" ADD CONSTRAINT "FK_a609b3a068366e66693b9106506" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "languages" ADD CONSTRAINT "FK_8f1b96a30ff66e0cd5c5c2fd797" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" DROP CONSTRAINT "FK_8f1b96a30ff66e0cd5c5c2fd797"`);
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT "FK_a609b3a068366e66693b9106506"`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`DROP TABLE "words"`);
    }

}
