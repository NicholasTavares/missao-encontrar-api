import { Injectable } from '@nestjs/common';
import { ObjectMissionCategoriesService } from 'src/domain/object-mission-categories/object-mission-categories.service';
import { UpdateObjectMissionCategoryDTO } from 'src/presentation/object-mission-categories/object-mission.dto';

@Injectable()
export class UpdateObjectMissionCategoryUseCase {
    constructor(
        private readonly objectMissionCategoriesService: ObjectMissionCategoriesService
    ) { }

    async execute(updateObjectMissionCategoryDTO: UpdateObjectMissionCategoryDTO) {
        try {
            const category = await this.objectMissionCategoriesService.updateObjectMissionCategory(updateObjectMissionCategoryDTO);
            return category;
        } catch (error) {
            throw error;
        }
    }
}