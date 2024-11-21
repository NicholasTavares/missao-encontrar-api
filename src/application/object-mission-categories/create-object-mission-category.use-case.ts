import { Injectable } from '@nestjs/common';
import { ObjectMissionCategoriesService } from 'src/domain/object-mission-categories/object-mission-categories.service';
import { CreateObjectMissionCategoryDTO } from 'src/presentation/object-mission-categories/object-mission.dto';

@Injectable()
export class CreateObjectMissionCategoryUseCase {
    constructor(
        private readonly objectMissionCategoriseService: ObjectMissionCategoriesService
    ) { }

    async execute(createObjectMissionCategoryDTO: CreateObjectMissionCategoryDTO) {
        try {
            const created_object_mission_category = await this.objectMissionCategoriseService.createObjectMissionCategory(createObjectMissionCategoryDTO);
            return created_object_mission_category;
        } catch (error) {
            throw error;
        }
    }
}