import { CreateMissionDTO } from "src/presentation/mission/mission.dto";
import { MissionEntity } from "../mission.entity";
import { MissionCategoryEntity } from "src/domain/mission-categories/mission-category.entity";
import { EntityManager } from "typeorm";

export interface MissionRepository {
    getMissionById(mission_id: string, manager?: EntityManager): Promise<MissionEntity | null>;
    getAllMissions(manager?: EntityManager): Promise<MissionEntity[]>;
    createMission(mission: CreateMissionDTO, manager?: EntityManager);
    saveOnCreateMission(mission: MissionEntity, category: MissionCategoryEntity, manager?: EntityManager);
    saveMission(mission: MissionEntity, manager?: EntityManager);
    deleteMission(mission_id: string, manager?: EntityManager);
};