import { Injectable } from '@nestjs/common';
import { PersonColorService } from 'src/domain/person-color/person-color.service';
import { CreatePersonColorDTO } from 'src/presentation/person-color/person-color.dto';

@Injectable()
export class CreatePersonColorUseCase {
    constructor(
        private readonly personColorService: PersonColorService
    ) { }

    async execute(createPersonColorDTO: CreatePersonColorDTO) {
        try {
            const created_person_color = await this.personColorService.createPersonColor(createPersonColorDTO);
            return created_person_color;
        } catch (error) {
            throw error;
        }
    }
}