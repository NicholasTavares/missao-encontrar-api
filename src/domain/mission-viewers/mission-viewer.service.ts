import { Injectable } from "@nestjs/common";
import { MissionViewersRepositoryImpl } from "src/infrastructure/database/mission-viewers/mission-viewers.repository";
import { CreateMissionViewerDTO } from "src/presentation/mission-viewers/mission-viewers.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class MissionViewerService {
    constructor(private readonly missionViewersRepositoryImpl: MissionViewersRepositoryImpl) { }

    async getMissionViewerByUserIdAndMissionId(user_id: string, mission_id: string, transactionManager?: EntityManager) {
        const mission_viewer = await this.missionViewersRepositoryImpl.getMissionViewerByUserIdAndMissionId(user_id, mission_id, transactionManager);

        return mission_viewer;
    };

    async createMissionViewer(createMissionViewerDTO: CreateMissionViewerDTO, transactionManager?: EntityManager) {
        const mission_viewer = this.missionViewersRepositoryImpl.createMissionViewer(createMissionViewerDTO);

        const saved_mission_viewer = await this.missionViewersRepositoryImpl.saveMissionViewer(mission_viewer, transactionManager);

        return saved_mission_viewer;
    };

    async getMissionViewersCountById(mission_id: string, transactionManager?: EntityManager) {
        const mission_timeline = await this.missionViewersRepositoryImpl.getMissionViewerCountByMissionId(mission_id, transactionManager);

        return mission_timeline;
    };
};