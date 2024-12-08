import { BadRequestException, Injectable } from "@nestjs/common";
import { MissionViewerService } from "src/domain/mission-viewers/mission-viewer.service";
import { MissionService } from "src/domain/mission/mission.service";
import { UserService } from "src/domain/user/user.service";
import { CreateMissionViewerDTO } from "src/presentation/mission-viewers/mission-viewers.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class CreateMissionViewerUseCase {
    constructor(
        private readonly missionViewerService: MissionViewerService,
        private readonly userService: UserService,
        private readonly missionService: MissionService,
        private readonly entityManager: EntityManager
    ) { }

    async execute(createMissionViewerDTO: CreateMissionViewerDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                await this.userService.getUserById(createMissionViewerDTO.user_id, transactionManager);

                const mission = await this.missionService.getMissionById(createMissionViewerDTO.mission_id, transactionManager);

                const mission_viewer = await this.missionViewerService.getMissionViewerByUserIdAndMissionId(createMissionViewerDTO.user_id, createMissionViewerDTO.mission_id, transactionManager);

                if (!mission_viewer) {
                    await this.missionViewerService.createMissionViewer(createMissionViewerDTO, transactionManager);
                    await this.missionService.incremetMissionViewsCount(mission, transactionManager);
                };
            } catch (error) {
                throw error;
            };
        });

    }
}