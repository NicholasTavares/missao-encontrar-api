import { EntityManager } from "typeorm";
import { PersonColorEntity } from "../person-color.entity";
import { CreatePersonColorDTO } from "src/presentation/person-color/person-color.dto";

export interface PersonColorRepository {
    getPersonColorById(person_color_id: string, transactionManager?: EntityManager): Promise<PersonColorEntity | null>;
    createPersonColor(person_color: CreatePersonColorDTO): PersonColorEntity;
    savePersonColor(person_color: PersonColorEntity, transactionManager?: EntityManager): Promise<PersonColorEntity>;
};