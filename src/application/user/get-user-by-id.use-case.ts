import { Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { UserEntity } from 'src/domain/user/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
    constructor(
        private readonly userService: UserService
    ) { }

    async execute(user_id: string): Promise<UserEntity> {
        const user = await this.userService.getUserById(user_id);
        return user;
    }
}