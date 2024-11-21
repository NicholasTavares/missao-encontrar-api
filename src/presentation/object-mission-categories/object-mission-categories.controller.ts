import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateObjectMissionCategoryDTO, UpdateObjectMissionCategoryDTO } from './object-mission.dto';
import { CreateObjectMissionCategoryUseCase } from 'src/application/object-mission-categories/create-object-mission-category.use-case';
import { UpdateObjectMissionCategoryUseCase } from 'src/application/object-mission-categories/update-object-mission-category.use-case';

@Controller('v1/object-mission-categories')
export class ObjectMissionCategoryController {
    constructor(
        private readonly createObjectMissionCategoryUseCase: CreateObjectMissionCategoryUseCase,
        private readonly updateObjectMissionCategoryUseCase: UpdateObjectMissionCategoryUseCase
    ) { }

    @Post()
    async createMissionCategory(@Body() body: CreateObjectMissionCategoryDTO) {
        const object_mission = await this.createObjectMissionCategoryUseCase.execute(body);
        return object_mission;
    };

    @Patch()
    async updateMissionCategory(@Body() body: UpdateObjectMissionCategoryDTO) {
        const object_mission = await this.updateObjectMissionCategoryUseCase.execute(body);
        return object_mission;
    };
}
