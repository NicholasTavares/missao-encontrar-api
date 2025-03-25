import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateMissionUseCase } from 'src/application/mission/create-mission.use-case';
import { GetAllMissionsUseCase } from 'src/application/mission/get-all-missions.use-case';
import { DeleteMissionDTO, MissionDTO, UpdateMissionDTO, UpdateMissionRewardsDTO } from './mission.dto';
import { UpdateMissionsUseCase } from 'src/application/mission/update-mission.use-case';
import { UpdateMissionsRewardsUseCase } from 'src/application/mission/update-mission-rewards.use-case';
import { DeleteMissionUseCase } from 'src/application/mission/delete-mission.use-case';

@Controller('v1/missions')
export class MissionController {
    constructor(
        private readonly getAllMissionsUseCase: GetAllMissionsUseCase,
        private readonly createMissionUseCase: CreateMissionUseCase,
        private readonly updateMissionsUseCase: UpdateMissionsUseCase,
        private readonly updateMissionsRewardsUseCase: UpdateMissionsRewardsUseCase,
        private readonly deleteMissionUseCase: DeleteMissionUseCase,
    ) { }

    @Get()
    async getAllMissions() {
        const missions = await this.getAllMissionsUseCase.execute();
        return missions;
    };

    @Post()
    async createMissions(@Body() body: MissionDTO) {
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

    @Delete()
    async deleteMission(@Body() body: DeleteMissionDTO) {
        const mission = await this.deleteMissionUseCase.execute(body);
        return mission;
    };
}
