import { Injectable } from '@nestjs/common';
import { UpdateMissionCategoryDTO } from 'src/presentation/mission-categories/mission-categories.dto';
import { MissionCategoryService } from 'src/domain/mission-categories/mission-categories.service';

@Injectable()
export class UpdateMissionCategoryUseCase {
    constructor(
        private readonly missionCategoryService: MissionCategoryService
    ) { }

    async execute(updateMissionCategoryDTO: UpdateMissionCategoryDTO) {
        try {
            const category = await this.missionCategoryService.updateMissionCategory(updateMissionCategoryDTO);
            return category;
        } catch (error) {
            throw error;
        }
    }
}