import { BadRequestException, Injectable } from "@nestjs/common";
import { MissionTimelineService } from "src/domain/mission-timeline/mission-timeline.service";
import { MissionService } from "src/domain/mission/mission.service";
import { UserService } from "src/domain/user/user.service";
import { CreateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class CreateMissionTimelineUseCase {
    constructor(
        private readonly missionTimelineService: MissionTimelineService,
        private readonly userService: UserService,
        private readonly missionService: MissionService,
        private readonly entityManager: EntityManager
    ) { }

    //TODO: validar no futuro (com autenticação) se o usuário que está tentando criar a timeline é o mesmo que criou a missão
    async execute(createMissionTimelineDTO: CreateMissionTimelineDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                const user = await this.userService.getUserById(createMissionTimelineDTO.user_id, transactionManager);

                const mission = await this.missionService.getMissionById(createMissionTimelineDTO.mission_id, transactionManager);

                if (user.id !== mission.user_id) {
                    throw new BadRequestException('Usuário não autorizado.')
                };

                const mission_timeline = await this.missionTimelineService.createMissionTimeline(createMissionTimelineDTO, transactionManager);

                return mission_timeline;
            } catch (error) {
                throw error;
            };
        });
    }
}