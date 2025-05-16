import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameForecasts1747377910711 implements MigrationInterface {
    name = 'RenameForecasts1747377910711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forecast" RENAME COLUMN "forecast" TO "forecasts"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forecast" RENAME COLUMN "forecasts" TO "forecast"`);
    }

}
