import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNumberColumn1763462903806 implements MigrationInterface {
    name = 'AddNumberColumn1763462903806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "number" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "number"`);
    }

}
