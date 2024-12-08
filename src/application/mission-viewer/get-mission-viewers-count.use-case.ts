import { Injectable } from "@nestjs/common";
import { MissionViewerService } from "src/domain/mission-viewers/mission-viewer.service";

@Injectable()
export class GetMissionViewersCountUseCase {
    constructor(
        private readonly missionViewerService: MissionViewerService,
    ) { }

    async execute(mission_id: string) {
        try {
            const mission_viewers_count = await this.missionViewerService.getMissionViewersCountById(mission_id);

            return mission_viewers_count;
        } catch (error) {
            throw error;
        };
    }
}