import {MigrationInterface, QueryRunner} from "typeorm";

export class v011637759939966 implements MigrationInterface {
    name = 'v011637759939966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_892974ddd433b8caa9de0a0bcef"`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "facilityId" integer NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visit" ("id" SERIAL NOT NULL, "todayAppearance" character varying NOT NULL, "disabilityType" character varying NOT NULL, "disabilityDescription" character varying NOT NULL, "startDateTime" TIMESTAMP NOT NULL, "endDateTime" TIMESTAMP NOT NULL, "facilityId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c9919ef5a07627657c535d8eb88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "call" ("id" SERIAL NOT NULL, "isCanceled" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT '"2021-11-24T13:19:00.568Z"', "deviceId" integer NOT NULL, CONSTRAINT "PK_2098af0169792a34f9cfdd39c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "devicesId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_6579fd04a3392b06adc68ccf72b" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_ff2720a2493891ce02f70d28a8a" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_27531e380326b478dacdd7b86d9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call" ADD CONSTRAINT "FK_1b39877f62ba0c6325f9857b987" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call" DROP CONSTRAINT "FK_1b39877f62ba0c6325f9857b987"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_27531e380326b478dacdd7b86d9"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_ff2720a2493891ce02f70d28a8a"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_6579fd04a3392b06adc68ccf72b"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "devicesId" integer`);
        await queryRunner.query(`DROP TABLE "call"`);
        await queryRunner.query(`DROP TABLE "visit"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_892974ddd433b8caa9de0a0bcef" FOREIGN KEY ("devicesId") REFERENCES "device"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
