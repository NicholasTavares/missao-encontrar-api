import { EntityManager } from "typeorm";
import { ObjectMissionEntity } from "../object-mission.entity";
import { CreateObjectMissionDTO } from "src/presentation/object-mission/object-mission.dto";
import { ObjectMissionCategoryEntity } from "src/domain/object-mission-categories/object-mission-categories.entity";

export interface ObjectMissionRepository {
    getObjectMissionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<ObjectMissionEntity | null>;
    createObjectMission(person_mission: CreateObjectMissionDTO): ObjectMissionEntity;
    saveObjectMission(person_mission: ObjectMissionEntity, category: ObjectMissionCategoryEntity, transactionManager?: EntityManager): Promise<ObjectMissionEntity>;
};