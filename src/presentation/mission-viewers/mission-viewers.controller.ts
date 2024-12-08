import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetMissionViewersCountUseCase } from 'src/application/mission-viewer/get-mission-viewers-count.use-case';
import { CreateMissionViewerDTO } from './mission-viewers.dto';
import { CreateMissionViewerUseCase } from 'src/application/mission-viewer/create-mission-viewers.user-case';
@Controller('v1/mission-viewers')
export class MissionViewersController {
    constructor(
        private readonly createMissionViewerUseCase: CreateMissionViewerUseCase,
        private readonly getMissionViewersCountUseCase: GetMissionViewersCountUseCase
    ) { }

    @Post()
    async createMissionViewer(@Body() createMissionViewerDTO: CreateMissionViewerDTO) {
        await this.createMissionViewerUseCase.execute(createMissionViewerDTO);
    };

    @Get(':mission_id')
    async getMissionViewer(@Param('mission_id') mission_id: string) {
        const mission_viewers_count = await this.getMissionViewersCountUseCase.execute(mission_id);
        return mission_viewers_count;
    };
}
