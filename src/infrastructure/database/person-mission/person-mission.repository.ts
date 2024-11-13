import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonMissionModel } from "./person-mission.model";
import { EntityManager, Repository } from "typeorm";
import { PersonMissionRepository } from "src/domain/person-mission/interfaces/person-mission-repository.interface";
import { PersonMissionEntity } from "src/domain/person-mission/person-mission.entity";
import { CreatePersonMissionDTO } from "src/presentation/person-mission/person-mission.dto";

@Injectable()
export class PersonMissionRepositoryImpl implements PersonMissionRepository {
    constructor(
        @InjectRepository(PersonMissionModel)
        private readonly missionRepository: Repository<PersonMissionModel>,
    ) { }

    async getPersonMissionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<PersonMissionEntity | null> {
        return transactionManager ? await transactionManager.findOne(PersonMissionModel, { where: { mission_id } }) : await this.missionRepository.findOne({ where: { mission_id } });
    };

    createPersonMission(person_mission: CreatePersonMissionDTO): PersonMissionEntity {
        const created_person_mission = this.missionRepository.create(person_mission);
        return created_person_mission;
    };

    async savePersonMission(person_mission: PersonMissionEntity, transactionManager?: EntityManager): Promise<PersonMissionEntity> {
        return transactionManager ? await transactionManager.save(PersonMissionModel, person_mission) : await this.missionRepository.save(person_mission);
    };
}