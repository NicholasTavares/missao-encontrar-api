import { Injectable } from '@nestjs/common';
import { CreateMissionCategoryDTO } from 'src/presentation/mission-categories/mission-categories.dto';
import { MissionCategoryService } from 'src/domain/mission-categories/mission-categories.service';

@Injectable()
export class CreateMissionCategoryUseCase {
    constructor(
        private readonly missionCategoryService: MissionCategoryService
    ) { }

    async execute(createMissionDTO: CreateMissionCategoryDTO) {
        try {
            const created_mission_category = await this.missionCategoryService.createMissionCategory(createMissionDTO);
            return created_mission_category;
        } catch (error) {
            throw error;
        };
    };
};