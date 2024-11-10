import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MissionCategoryModel } from './mission-categories.model';
import { MissionCategoriesRepository } from 'src/domain/mission-categories/interfaces/mission-categories-repository.interface';
import { MissionCategoryEntity } from 'src/domain/mission-categories/mission-category.entity';
import { CreateMissionCategoryDTO } from 'src/presentation/mission-categories/mission-categories.dto';

@Injectable()
export class MissionCategoriesRepositoryImpl implements MissionCategoriesRepository {
    constructor(
        @InjectRepository(MissionCategoryModel)
        private readonly missionRepository: Repository<MissionCategoryModel>,
    ) { }

    async getAllMissionCategories(): Promise<MissionCategoryEntity[]> {
        throw new Error('Method not implemented.');
    };

    async getCategoryById(category_id: string, transactionManager?: EntityManager): Promise<MissionCategoryEntity | null> {
        return transactionManager
            ? await transactionManager.findOne(MissionCategoryModel, { where: { id: category_id } })
            : await this.missionRepository.findOne({ where: { id: category_id } });
    };

    async getCategoryByName(category_name: string): Promise<MissionCategoryEntity | null> {
        const category = this.missionRepository.findOne({
            where: {
                category: category_name,
            }
        });

        return category;
    };

    async getCategoryByLevel(category_level: number): Promise<MissionCategoryEntity | null> {
        const category = this.missionRepository.findOne({
            where: {
                level: category_level,
            }
        });

        return category;
    };

    createCategory(mission_category: CreateMissionCategoryDTO): MissionCategoryEntity {
        const created_mission_category = this.missionRepository.create(mission_category);
        return created_mission_category;
    };

    async saveCategory(mission_category: MissionCategoryEntity, transactionManager?: EntityManager): Promise<MissionCategoryEntity> {
        return transactionManager ? await transactionManager.save(MissionCategoryModel, mission_category) : await this.missionRepository.save(mission_category);
    };
}