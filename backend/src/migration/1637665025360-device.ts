import {MigrationInterface, QueryRunner} from "typeorm";

export class device1637665025360 implements MigrationInterface {
    name = 'device1637665025360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device" ("id" SERIAL NOT NULL, "serialCode" character varying NOT NULL, "userId" integer NOT NULL, "name" character varying NOT NULL, "tel" character varying NOT NULL, CONSTRAINT "UQ_d27e0b92176ac42bbdb1932c940" UNIQUE ("serialCode"), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "devicesId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_892974ddd433b8caa9de0a0bcef" FOREIGN KEY ("devicesId") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_9eb58b0b777dbc2864820228ebc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_892974ddd433b8caa9de0a0bcef"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "devicesId"`);
        await queryRunner.query(`DROP TABLE "device"`);
    }

}
