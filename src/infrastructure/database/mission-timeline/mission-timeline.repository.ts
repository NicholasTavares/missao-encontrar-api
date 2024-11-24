import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MissionTimelineRepository } from "src/domain/mission-timeline/interfaces/mission-timeline-repository.interface";
import { MissionTimelineModel } from "./mission-timeline.model";
import { EntityManager, Repository } from "typeorm";
import { MissionTimelineEntity } from "src/domain/mission-timeline/mission-timeline.entity";
import { CreateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";

@Injectable()
export class MissionTimelineRepositoryImpl implements MissionTimelineRepository {
    constructor(
        @InjectRepository(MissionTimelineModel)
        private readonly missionTimelineRepository: Repository<MissionTimelineModel>,
    ) { }

    async getMissionTimelineById(mission_timeline_id: string, transactionManager?: EntityManager): Promise<MissionTimelineEntity | null> {
        return transactionManager
            ? await transactionManager.findOne(MissionTimelineModel, { where: { id: mission_timeline_id } })
            : await this.missionTimelineRepository.findOne({ where: { id: mission_timeline_id } });
    };

    async getAllMissionsTimelineByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<MissionTimelineEntity[] | null> {
        return transactionManager
            ? await transactionManager.find(MissionTimelineModel, { where: { mission_id } })
            : await this.missionTimelineRepository.find({ where: { mission_id } });
    };

    createMissionTimeline(mission: CreateMissionTimelineDTO) {
        const created_mission_timeline = this.missionTimelineRepository.create(mission);
        return created_mission_timeline;
    };

    async saveMissionTimeline(mission_timeline: MissionTimelineEntity, transactionManager?: EntityManager) {
        return transactionManager ? await transactionManager.save(MissionTimelineModel, mission_timeline) : await this.missionTimelineRepository.save(mission_timeline);
    }
}