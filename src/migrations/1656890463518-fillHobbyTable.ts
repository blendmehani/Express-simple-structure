import { MigrationInterface, QueryRunner } from "typeorm"

export class fillHobbyTable1656890463518 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        insert into Hobby(name) values ('Boxing'),
                                       ('Football'),
                                       ('Hokey'),
                                       ('Basketball');
                                       
        `)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
