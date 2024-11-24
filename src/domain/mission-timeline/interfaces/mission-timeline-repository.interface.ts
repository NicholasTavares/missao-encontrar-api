import { EntityManager } from "typeorm";
import { MissionTimelineEntity } from "../mission-timeline.entity";
import { CreateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";

export interface MissionTimelineRepository {
    getAllMissionsTimelineByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<MissionTimelineEntity[] | null>;
    getMissionTimelineById(mission_timeline_id: string, transactionManager?: EntityManager): Promise<MissionTimelineEntity | null>;
    createMissionTimeline(mission: CreateMissionTimelineDTO);
    saveMissionTimeline(mission: MissionTimelineEntity, transactionManager?: EntityManager);
};