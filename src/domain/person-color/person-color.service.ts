import { BadRequestException, Injectable } from "@nestjs/common";
import { PersonColorRepositoryImpl } from "src/infrastructure/database/person-color/person-color.repository";
import { CreatePersonColorDTO } from "src/presentation/person-color/person-color.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class PersonColorService {
    constructor(private readonly personColorRepositoryImpl: PersonColorRepositoryImpl) { }

    async createPersonColor(createPersonColorDTO: CreatePersonColorDTO, transactionManager?: EntityManager) {
        const existing_person_color = await this.personColorRepositoryImpl.getPersonColorByColor(createPersonColorDTO.color, transactionManager);

        if (existing_person_color) {
            throw new BadRequestException(`Cor ${createPersonColorDTO.color} já existe.`);
        };

        const created_person_color = this.personColorRepositoryImpl.createPersonColor(createPersonColorDTO);
        const saved_person_color = await this.personColorRepositoryImpl.savePersonColor(created_person_color, transactionManager);

        return saved_person_color;
    };

    async getPersonColorById(color_id: string, transactionManager?: EntityManager) {
        const person_color = await this.personColorRepositoryImpl.getPersonColorById(color_id, transactionManager);

        if (!person_color) {
            throw new BadRequestException(`Cor ${color_id} não encontrada.`);
        }

        return person_color;
    };
}