import { CreateUserDTO } from "src/presentation/user/user.dto";
import { UserEntity } from "../entities/user.entity";
import { EntityManager } from "typeorm";

export interface UserRepository {
    getUserById(user_id: string, transactionManager?: EntityManager): Promise<UserEntity | null>;
    getUserByEmail(email: string): Promise<UserEntity | null>;
    getUserByPhone(phone: string): Promise<UserEntity | null>;
    createUser(user: CreateUserDTO): Promise<UserEntity>;
    saveUser(user: UserEntity): Promise<UserEntity>;
};