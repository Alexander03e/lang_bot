import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTry1735856425633 implements MigrationInterface {
    name = 'FixTry1735856425633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tgId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tgId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tgId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tgId" text NOT NULL`);
    }

}
