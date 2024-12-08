import { EntityManager } from "typeorm";
import { CreateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";
import { MissionViewerEntity } from "../mission-viewer.entity";

export interface MissionViewerRepository {
    getMissionViewerByUserIdAndMissionId(user_id: string, mission_id: string, transactionManager?: EntityManager);
    getMissionViewerCountByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<number>;
    createMissionViewer(mission_viewer: CreateMissionTimelineDTO);
    saveMissionViewer(mission_viewer: MissionViewerEntity, transactionManager?: EntityManager);
};