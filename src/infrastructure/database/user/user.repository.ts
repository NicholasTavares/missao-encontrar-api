import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserRepository } from 'src/domain/user/interfaces/user-repository.interface';
import { UserModel } from './user.model';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { CreateUserDTO } from 'src/presentation/user/user.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @InjectRepository(UserModel)
        private readonly userRepository: Repository<UserModel>,
    ) { }

    async getUserById(user_id: string, transactionManager?: EntityManager): Promise<UserEntity | null> {
        const user = transactionManager ? await transactionManager.findOne(UserModel, {
            where: {
                id: user_id
            }
        }) : await this.userRepository.findOne({
            where: {
                id: user_id
            }
        });

        return user;
    };

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        return user;
    };

    async getUserByPhone(phone: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({
            where: {
                phone,
            }
        });

        return user;
    };

    async createUser(user: CreateUserDTO): Promise<UserEntity> {
        const created_user = this.userRepository.create(user);
        return created_user;
    };

    async saveUser(user: UserEntity): Promise<UserEntity> {
        const saved_user = await this.userRepository.save(user);
        return saved_user;
    }
};