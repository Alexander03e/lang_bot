import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1735863556751 implements MigrationInterface {
    name = 'FixRelations1735863556751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "description" SET DEFAULT ' '`);
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "description" SET DEFAULT ' '`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "words" ALTER COLUMN "description" DROP DEFAULT`);
    }

}
