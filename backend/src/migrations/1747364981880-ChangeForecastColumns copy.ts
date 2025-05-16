import { MigrationInterface, QueryRunner } from "typeorm";

export class  ChangeForecastColumns1747364981880 implements MigrationInterface {
    name = ' ChangeForecastColumns1747364981880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forecast" DROP COLUMN "period"`);
        await queryRunner.query(`ALTER TABLE "forecast" ADD "partId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forecast" ADD "partName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forecast" DROP COLUMN "partName"`);
        await queryRunner.query(`ALTER TABLE "forecast" DROP COLUMN "partId"`);
        await queryRunner.query(`ALTER TABLE "forecast" ADD "period" integer NOT NULL`);
    }

}
