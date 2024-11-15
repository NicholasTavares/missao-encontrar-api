import { Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { CreateUserDTO } from 'src/presentation/user/user.dto';

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userService: UserService
    ) { }

    // TODO: incluir sexo da pessoa
    async execute(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const user = await this.userService.createUser(createUserDTO);
        return user;
    }
}