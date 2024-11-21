import { EntityManager } from "typeorm";
import { ObjectMissionCategoryEntity } from "../object-mission-categories.entity";
import { CreateObjectMissionCategoryDTO } from "src/presentation/object-mission-categories/object-mission.dto";

export interface ObjectMissionCategoryRepository {
    getAllObjectMissionCategories(): Promise<ObjectMissionCategoryEntity[]>;
    getCategoryById(category_id: string, transactionManager?: EntityManager): Promise<ObjectMissionCategoryEntity | null>;
    getCategoryByName(category: string): Promise<ObjectMissionCategoryEntity | null>;
    createObjectMissionCategory(object_mission_category: CreateObjectMissionCategoryDTO): ObjectMissionCategoryEntity;
    saveObjectMissionCategory(object_mission_category: ObjectMissionCategoryEntity): Promise<ObjectMissionCategoryEntity>;
};