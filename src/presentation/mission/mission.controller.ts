import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateMissionUseCase } from 'src/application/mission/create-mission.use-case';
import { GetAllMissionsUseCase } from 'src/application/mission/get-all-missions.use-case';
import { CreateMissionDTO, UpdateMissionDTO, UpdateMissionRewardsDTO } from './mission.dto';
import { UpdateMissionsUseCase } from 'src/application/mission/update-mission.use-case';
import { UpdateMissionsRewardsUseCase } from 'src/application/mission/update-mission-rewards.use-case';

@Controller('v1/missions')
export class MissionController {
    constructor(
        private readonly getAllMissionsUseCase: GetAllMissionsUseCase,
        private readonly createMissionUseCase: CreateMissionUseCase,
        private readonly updateMissionsUseCase: UpdateMissionsUseCase,
        private readonly updateMissionsRewardsUseCase: UpdateMissionsRewardsUseCase
    ) { }

    @Get()
    async getAllMissions() {
        const missions = await this.getAllMissionsUseCase.execute();
        return missions;
    };

    @Post()
    async createMissions(@Body() body: CreateMissionDTO) {
        const mission = await this.createMissionUseCase.execute(body);
        return mission;
    };

    @Patch()
    async updateMission(@Body() body: UpdateMissionDTO) {
        const mission = await this.updateMissionsUseCase.execute(body);
        return mission;
    };

    @Patch('rewards')
    async updateMissionRewards(@Body() body: UpdateMissionRewardsDTO) {
        const mission = await this.updateMissionsRewardsUseCase.execute(body);
        return mission;
    };
}
