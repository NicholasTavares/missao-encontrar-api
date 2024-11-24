import { Injectable } from "@nestjs/common";
import { MissionTimelineService } from "src/domain/mission-timeline/mission-timeline.service";

@Injectable()
export class GetMissionTimelineUseCase {
    constructor(
        private readonly missionTimelineService: MissionTimelineService,
    ) { }

    async execute(mission_id: string) {
        try {
            const mission_timeline = await this.missionTimelineService.getMissionTimelineByMissionId(mission_id);

            return mission_timeline;
        } catch (error) {
            throw error;
        };
    }
}