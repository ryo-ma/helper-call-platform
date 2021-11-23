import {MigrationInterface, QueryRunner} from "typeorm";

export class facility21637686990907 implements MigrationInterface {
    name = 'facility21637686990907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "latitude" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "facility" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "facility" ADD "longitude" integer NOT NULL`);
    }

}
