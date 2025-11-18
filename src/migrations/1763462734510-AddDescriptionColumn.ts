import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionColumn1763462734510 implements MigrationInterface {
    name = 'AddDescriptionColumn1763462734510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "description"`);
    }

}
