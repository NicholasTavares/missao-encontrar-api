import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateMissionFollowerDTO } from "./mission-followers.dto";
import { HandleMissionFollowerUseCase } from "src/application/mission-followers/handle-mission-follower.use-case";
import { GetMissionFollowersCountUseCase } from "src/application/mission-followers/get-misson-followers-count.use-case";

@Controller('v1/mission-followers')
export class MissionFollowersController {
    constructor(
        private readonly handleMissionFollowerUseCase: HandleMissionFollowerUseCase,
        private readonly getMissionFollowersUseCase: GetMissionFollowersCountUseCase,
    ) { }

    @Post()
    async handleMissionFollower(@Body() body: CreateMissionFollowerDTO) {
        const mission_follower = await this.handleMissionFollowerUseCase.execute(body);
        return mission_follower;
    };

    @Get(':mission_id')
    async getMissionFollowersCount(@Param('mission_id') mission_id: string) {
        const mission_followers_count = await this.getMissionFollowersUseCase.execute(mission_id);
        return mission_followers_count;
    };
}
