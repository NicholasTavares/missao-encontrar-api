import { Injectable, NotFoundException } from "@nestjs/common";
import { MissionTimelineService } from "src/domain/mission-timeline/mission-timeline.service";
import { UpdateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class UpdateMissionTimelineUseCase {
    constructor(
        private readonly missionTimelineService: MissionTimelineService,
        private readonly entityManager: EntityManager
    ) { }

    //TODO: validar no futuro (com autenticação) se o usuário que está tentando atualizar a timeline é o mesmo que a criou
    async execute(mission_timeline_id: string, updateMissionTimeline: UpdateMissionTimelineDTO) {
        try {
            const mission_timeline = await this.missionTimelineService.getMissionTimelineById(mission_timeline_id);

            if (!mission_timeline) {
                throw new NotFoundException(`Timeline não encontrada.`);
            };

            const updated_mission_timeline = await this.missionTimelineService.updateMissionTimeline(mission_timeline, updateMissionTimeline);

            return updated_mission_timeline;
        } catch (error) {
            throw error;
        };
    }
}