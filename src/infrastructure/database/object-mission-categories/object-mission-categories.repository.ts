import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MissionCategoryEntity } from 'src/domain/mission-categories/mission-category.entity';
import { ObjectMissionCategoryModel } from './object-mission-categories.model';
import { ObjectMissionCategoryRepository } from 'src/domain/object-mission-categories/interfaces/object-mission-categories-repository.interface';
import { ObjectMissionCategoryEntity } from 'src/domain/object-mission-categories/object-mission-categories.entity';
import { CreateObjectMissionCategoryDTO } from 'src/presentation/object-mission-categories/object-mission.dto';

@Injectable()
export class ObjectMissionCategoryRepositoryImpl implements ObjectMissionCategoryRepository {
    constructor(
        @InjectRepository(ObjectMissionCategoryModel)
        private readonly objectMissionCategoryRepository: Repository<ObjectMissionCategoryModel>,
    ) { }

    async getAllObjectMissionCategories(): Promise<MissionCategoryEntity[]> {
        throw new Error('Method not implemented.');
    };

    async getCategoryById(category_id: string, transactionManager?: EntityManager): Promise<ObjectMissionCategoryEntity | null> {
        return transactionManager
            ? await transactionManager.findOne(ObjectMissionCategoryModel, { where: { id: category_id } })
            : await this.objectMissionCategoryRepository.findOne({ where: { id: category_id } });
    };

    async getCategoryByName(category_name: string): Promise<ObjectMissionCategoryEntity | null> {
        const category = this.objectMissionCategoryRepository.findOne({
            where: {
                category: category_name,
            }
        });

        return category;
    };

    createObjectMissionCategory(object_mission_category: CreateObjectMissionCategoryDTO): ObjectMissionCategoryEntity {
        const created_mission_category = this.objectMissionCategoryRepository.create(object_mission_category);
        return created_mission_category;
    };

    async saveObjectMissionCategory(mission_category: ObjectMissionCategoryEntity, transactionManager?: EntityManager): Promise<ObjectMissionCategoryEntity> {
        return transactionManager ? await transactionManager.save(ObjectMissionCategoryModel, mission_category) : await this.objectMissionCategoryRepository.save(mission_category);
    };
}