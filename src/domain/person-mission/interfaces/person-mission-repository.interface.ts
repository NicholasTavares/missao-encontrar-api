import { PersonMissionEntity } from "../person-mission.entity";
import { CreatePersonMissionDTO } from "src/presentation/person-mission/person-mission.dto";
import { EntityManager } from "typeorm";

export interface PersonMissionRepository {
    getPersonMissionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<PersonMissionEntity | null>;
    createPersonMission(person_mission: CreatePersonMissionDTO): PersonMissionEntity;
    savePersonMission(person_mission: PersonMissionEntity, transactionManager?: EntityManager): Promise<PersonMissionEntity>;
};