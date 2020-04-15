import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import {User} from '../entity/User';

export class CreateAdminUser1582107363911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user= new User();
        user.username= "admin";
        user.password= "admin";
        user.hashPassword();
        user.role = "ADMIN";
        user.email="admin@admin.com";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
