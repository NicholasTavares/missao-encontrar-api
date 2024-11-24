import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMissionTimelineUseCase } from 'src/application/mission-timeline/create-mission-timeline.use-case';
import { CreateMissionTimelineDTO, UpdateMissionTimelineDTO } from './mission-timeline.dto';
import { GetMissionTimelineUseCase } from 'src/application/mission-timeline/get-mission-timeline.use-case';
import { UpdateMissionTimelineUseCase } from 'src/application/mission-timeline/update-mission-timeline.use-case';

@Controller('v1/mission-timeline')
export class MissionTimelineController {
    constructor(
        private readonly createMissionTimelineUseCase: CreateMissionTimelineUseCase,
        private readonly getMissionTimelineUseCase: GetMissionTimelineUseCase,
        private readonly updateMissionTimelineUseCase: UpdateMissionTimelineUseCase
    ) { }

    @Post()
    async createMissionTimelinse(@Body() body: CreateMissionTimelineDTO) {
        const mission_timeline = await this.createMissionTimelineUseCase.execute(body);
        return mission_timeline;
    };

    @Get(':mission_id')
    async getMissionTimeline(@Param('mission_id') mission_id: string) {
        const mission_timeline = await this.getMissionTimelineUseCase.execute(mission_id);
        return mission_timeline;
    };

    @Patch(':mission_timeline_id')
    async updateMissionTimeline(@Param('mission_timeline_id') mission_timeline_id: string, @Body() updateMissionTimelineDTO: UpdateMissionTimelineDTO) {
        const updated_mission_timeline = await this.updateMissionTimelineUseCase.execute(mission_timeline_id, updateMissionTimelineDTO);
        return updated_mission_timeline;
    };
}
