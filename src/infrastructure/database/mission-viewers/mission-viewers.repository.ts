import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { MissionViewerRepository } from "src/domain/mission-viewers/interfaces/mission-viewer-repository.interface";
import { MissionViewerEntity } from "src/domain/mission-viewers/mission-viewer.entity";
import { MissionViewerModel } from "./mission-viewer.model";
import { CreateMissionViewerDTO } from "src/presentation/mission-viewers/mission-viewers.dto";

@Injectable()
export class MissionViewersRepositoryImpl implements MissionViewerRepository {
    constructor(
        @InjectRepository(MissionViewerModel)
        private readonly missionViewerRepository: Repository<MissionViewerModel>,
    ) { }

    async getMissionViewerByUserIdAndMissionId(user_id: string, mission_id: string, transactionManager?: EntityManager) {
        return transactionManager ? await transactionManager.findOne(MissionViewerModel, { where: { user_id, mission_id } }) : await this.missionViewerRepository.findOne({ where: { user_id, mission_id } });
    }

    async getMissionViewerCountByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<number> {
        return transactionManager ? await transactionManager.count(MissionViewerModel, { where: { mission_id } }) : await this.missionViewerRepository.count({ where: { mission_id } });
    };

    createMissionViewer(mission_viewer: CreateMissionViewerDTO) {
        const created_mission_timeline = this.missionViewerRepository.create(mission_viewer);
        return created_mission_timeline;
    };

    async saveMissionViewer(mission_viewer: MissionViewerEntity, transactionManager?: EntityManager) {
        return transactionManager ? await transactionManager.save(MissionViewerModel, mission_viewer) : await this.missionViewerRepository.save(mission_viewer);
    };
}