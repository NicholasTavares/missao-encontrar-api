import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { PersonColorModel } from "./person-color.model";
import { PersonColorEntity } from "src/domain/person-color/person-color.entity";
import { CreatePersonColorDTO } from "src/presentation/person-color/person-color.dto";
import { PersonColorRepository } from "src/domain/person-color/interfaces/person-color-repository.interface";

@Injectable()
export class PersonColorRepositoryImpl implements PersonColorRepository {
    constructor(
        @InjectRepository(PersonColorModel)
        private readonly personColorRepository: Repository<PersonColorModel>,
    ) { }

    async getPersonColorById(color_id: string, transactionManager?: EntityManager): Promise<PersonColorEntity | null> {
        return transactionManager ? await transactionManager.findOne(PersonColorModel, { where: { id: color_id } }) : await this.personColorRepository.findOne({ where: { id: color_id } });
    };

    async getPersonColorByColor(color: string, transactionManager?: EntityManager): Promise<PersonColorEntity | null> {
        return transactionManager ? await transactionManager.findOne(PersonColorModel, { where: { color } }) : await this.personColorRepository.findOne({ where: { color } });
    };

    createPersonColor(person_color: CreatePersonColorDTO): PersonColorEntity {
        const created_person_mission = this.personColorRepository.create(person_color);
        return created_person_mission;
    };

    async savePersonColor(person_color: PersonColorEntity, transactionManager?: EntityManager): Promise<PersonColorEntity> {
        return transactionManager ? await transactionManager.save(PersonColorModel, person_color) : await this.personColorRepository.save(person_color);
    };
}