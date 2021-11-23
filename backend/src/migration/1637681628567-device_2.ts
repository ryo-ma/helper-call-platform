import {MigrationInterface, QueryRunner} from "typeorm";

export class device21637681628567 implements MigrationInterface {
    name = 'device21637681628567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "tel"`);
        await queryRunner.query(`ALTER TABLE "device" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "device" ADD "tel" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "device" ADD "name" character varying NOT NULL`);
    }

}
