import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1733711730513 implements MigrationInterface {
    name = 'CreateTables1733711730513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "database_file" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_6a48e4fea10786b44d274ba8175" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "part" ("id" SERIAL NOT NULL, "brand" character varying NOT NULL, "carModel" character varying NOT NULL, "description" character varying NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "article" integer NOT NULL, "vin" character varying NOT NULL, "type" character varying NOT NULL, "price" integer NOT NULL, "partImageId" integer, CONSTRAINT "REL_ddc8a784059782bd8d7725708f" UNIQUE ("partImageId"), CONSTRAINT "PK_58888debdf048d2dfe459aa59da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "part_quantity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "partId" integer, CONSTRAINT "PK_7f840c959b29e9795c11cffb204" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('open', 'closed')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "orderStatus" "public"."order_orderstatus_enum" NOT NULL, "orderDate" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('m', 'f', 'u')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(15) NOT NULL, "email" character varying(40) NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "firstName" character varying(30) NOT NULL, "secondName" character varying(30) NOT NULL, "thirdName" character varying(30) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forecast" ("id" SERIAL NOT NULL, "period" integer NOT NULL, "forecast" json, CONSTRAINT "PK_aee67ed6c40e832a806c429a2ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_part_quantities_part_quantity" ("orderId" integer NOT NULL, "partQuantityId" integer NOT NULL, CONSTRAINT "PK_3a806806c9e4e59c653307e400e" PRIMARY KEY ("orderId", "partQuantityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c24d2ba29365af8b3d5308787a" ON "order_part_quantities_part_quantity" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff82ebfb0d8ce791d0240058d1" ON "order_part_quantities_part_quantity" ("partQuantityId") `);
        await queryRunner.query(`ALTER TABLE "part" ADD CONSTRAINT "FK_ddc8a784059782bd8d7725708f3" FOREIGN KEY ("partImageId") REFERENCES "database_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "part_quantity" ADD CONSTRAINT "FK_2a9c446323b649a0d629a1412a1" FOREIGN KEY ("partId") REFERENCES "part"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_part_quantities_part_quantity" ADD CONSTRAINT "FK_c24d2ba29365af8b3d5308787a5" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_part_quantities_part_quantity" ADD CONSTRAINT "FK_ff82ebfb0d8ce791d0240058d1d" FOREIGN KEY ("partQuantityId") REFERENCES "part_quantity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_part_quantities_part_quantity" DROP CONSTRAINT "FK_ff82ebfb0d8ce791d0240058d1d"`);
        await queryRunner.query(`ALTER TABLE "order_part_quantities_part_quantity" DROP CONSTRAINT "FK_c24d2ba29365af8b3d5308787a5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "part_quantity" DROP CONSTRAINT "FK_2a9c446323b649a0d629a1412a1"`);
        await queryRunner.query(`ALTER TABLE "part" DROP CONSTRAINT "FK_ddc8a784059782bd8d7725708f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff82ebfb0d8ce791d0240058d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c24d2ba29365af8b3d5308787a"`);
        await queryRunner.query(`DROP TABLE "order_part_quantities_part_quantity"`);
        await queryRunner.query(`DROP TABLE "forecast"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
        await queryRunner.query(`DROP TABLE "part_quantity"`);
        await queryRunner.query(`DROP TABLE "part"`);
        await queryRunner.query(`DROP TABLE "database_file"`);
    }

}
