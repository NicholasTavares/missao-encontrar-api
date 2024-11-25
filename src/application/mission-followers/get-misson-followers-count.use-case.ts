import { Injectable } from "@nestjs/common";
import { MissionFollowersService } from "src/domain/mission-followers/mission-followers.service";
import { MissionService } from "src/domain/mission/mission.service";

@Injectable()
export class GetMissionFollowersCountUseCase {
    constructor(
        private readonly missionFollowersService: MissionFollowersService,
        private readonly missionService: MissionService,
    ) { }

    async execute(mission_id: string) {
        try {
            await this.missionService.getMissionById(mission_id);

            const mission_followers_count = await this.missionFollowersService.getFollowersCountByMissionId(mission_id);
            return mission_followers_count;
        } catch (error) {
            throw error;
        };
    };
};