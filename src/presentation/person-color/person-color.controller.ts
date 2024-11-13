import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonColorDTO } from './person-color.dto';
import { CreatePersonColorUseCase } from 'src/application/person-color/create-person-color.use-case';

@Controller('v1/person-color')
export class PersonColorController {
    constructor(
        private readonly createPersonColorUseCase: CreatePersonColorUseCase
    ) { }

    @Post()
    async createPersonColor(@Body() body: CreatePersonColorDTO) {
        const person_color = await this.createPersonColorUseCase.execute(body);
        return person_color;
    };
};