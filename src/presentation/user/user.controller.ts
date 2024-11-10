import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUserByIdUseCase } from 'src/application/user/get-user-by-id.use-case';
import { CreateUserDTO } from './user.dto';
import { CreateUserUseCase } from 'src/application/user/create-user.use-case';

@Controller('v1/users')
export class UserController {
    constructor(
        private readonly getUserByIdUserCase: GetUserByIdUseCase,
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    @Post()
    async createUser(@Body() body: CreateUserDTO) {
        const user = await this.createUserUseCase.execute(body);
        return user;
    };

    @Get(':user_id')
    async getUserById(@Param('user_id') user_id: string) {
        const user = await this.getUserByIdUserCase.execute(user_id);
        return user;
    };
};