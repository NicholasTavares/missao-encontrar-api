import { MissionCategoryEntity } from "../mission-category.entity";
import { CreateMissionCategoryDTO } from "src/presentation/mission-categories/mission-categories.dto";

export interface MissionCategoriesRepository {
    getAllMissionCategories(): Promise<MissionCategoryEntity[]>;
    getCategoryById(category_id: string): Promise<MissionCategoryEntity | null>;
    getCategoryByName(category: string): Promise<MissionCategoryEntity | null>;
    getCategoryByLevel(category_level: number): Promise<MissionCategoryEntity | null>;
    createCategory(mission: CreateMissionCategoryDTO): MissionCategoryEntity;
    saveCategory(mission: MissionCategoryEntity): Promise<MissionCategoryEntity>;
};