import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateMissionCategoryUseCase } from 'src/application/mission-categories/create-mission-category.use-case';
import { CreateMissionCategoryDTO, UpdateMissionCategoryDTO } from './mission-categories.dto';
import { UpdateMissionCategoryUseCase } from 'src/application/mission-categories/update-mission-category.use-case';

@Controller('v1/mission-categories')
export class MissionCategoryController {
    constructor(
        private readonly createMissionCategoryUseCase: CreateMissionCategoryUseCase,
        private readonly updateMissionCategoryUseCase: UpdateMissionCategoryUseCase
    ) { }

    @Post()
    async createMissionCategory(@Body() body: CreateMissionCategoryDTO) {
        const mission = await this.createMissionCategoryUseCase.execute(body);
        return mission;
    };

    @Patch()
    async updateMissionCategory(@Body() body: UpdateMissionCategoryDTO) {
        const mission = await this.updateMissionCategoryUseCase.execute(body);
        return mission;
    };
}
