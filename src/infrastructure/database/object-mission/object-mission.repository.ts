import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { ObjectMissionRepository } from "src/domain/object-mission/interfaces/object-mission-repository.interface";
import { CreateObjectMissionDTO } from "src/presentation/object-mission/object-mission.dto";
import { ObjectMissionEntity } from "src/domain/object-mission/object-mission.entity";
import { ObjectMissionModel } from "./object-mission.model";
import { ObjectMissionCategoryEntity } from "src/domain/object-mission-categories/object-mission-categories.entity";


@Injectable()
export class ObjectMissionRepositoryImpl implements ObjectMissionRepository {
    constructor(
        @InjectRepository(ObjectMissionModel)
        private readonly missionRepository: Repository<ObjectMissionModel>,
    ) { }

    async getObjectMissionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<ObjectMissionEntity | null> {
        return transactionManager ? await transactionManager.findOne(ObjectMissionModel, { where: { mission_id } }) : await this.missionRepository.findOne({ where: { mission_id } });
    };

    createObjectMission(object_mission: CreateObjectMissionDTO): ObjectMissionEntity {
        const created_object_mission = this.missionRepository.create(object_mission);
        return created_object_mission;
    };

    async saveObjectMission(object_mission: ObjectMissionEntity, category: ObjectMissionCategoryEntity, transactionManager?: EntityManager): Promise<ObjectMissionEntity> {
        return transactionManager ? await transactionManager.save(ObjectMissionModel, {
            ...object_mission,
            object_mission_categories: [category]
        }) : await this.missionRepository.save({
            ...object_mission,
            object_mission_categories: [category]
        });
    };
}