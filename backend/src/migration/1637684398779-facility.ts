import {MigrationInterface, QueryRunner} from "typeorm";

export class facility1637684398779 implements MigrationInterface {
    name = 'facility1637684398779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "facility" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_07c6c82781d105a680b5c265be6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "facility"`);
    }

}
