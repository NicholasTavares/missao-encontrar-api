import { EntityManager } from "typeorm";
import { MissionDeleteReasonEntity } from "../mission-delete-reason.entity";
import { CreateMissionDeleteReasonDTO } from "src/presentation/mission-delete-reason/mission-delete-reason.dto";

export interface MissionDeleteReasonRepository {
    createMissionDeleteReason(createMissionDeleteReasonDTO: CreateMissionDeleteReasonDTO): MissionDeleteReasonEntity;
    saveMissionDeleteReason(missionDeleteReasonEntity: MissionDeleteReasonEntity, transactionManager?: EntityManager): Promise<MissionDeleteReasonEntity>;
};