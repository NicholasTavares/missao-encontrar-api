import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MissionCategoriesRepositoryImpl } from 'src/infrastructure/database/mission-categories/mission-categories.repository';
import { CreateMissionCategoryDTO, UpdateMissionCategoryDTO } from 'src/presentation/mission-categories/mission-categories.dto';
import { EntityManager } from 'typeorm';
import { MissionCategoryEntity } from './mission-category.entity';

@Injectable()
export class MissionCategoryService {
    private readonly MIN_CATEGORY_LENGTH = 3;
    private readonly MIN_CATEGORY_DESCRIPTION_LENGTH = 5;
    constructor(private readonly missionCategoryRepository: MissionCategoriesRepositoryImpl) { }

    async getMissionCategoryById(category_id: string, transactionManager?: EntityManager): Promise<MissionCategoryEntity | null> {
        const category = await this.missionCategoryRepository.getCategoryById(category_id, transactionManager);

        if (!category) {
            throw new NotFoundException(`Categoria com id ${category_id} não encontrada.`);
        };

        return category;
    };

    async createMissionCategory(createMissionCategoryDTO: CreateMissionCategoryDTO) {
        if (createMissionCategoryDTO.category.length < this.MIN_CATEGORY_LENGTH) {
            throw new BadRequestException(`Categoria da missão deve ter no mínimo ${this.MIN_CATEGORY_LENGTH} caracteres.`);
        };

        if (createMissionCategoryDTO.description.length < this.MIN_CATEGORY_DESCRIPTION_LENGTH) {
            throw new BadRequestException(`Descrição da categoria da missão deve ter no mínimo ${this.MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`);
        };

        const existing_category = await this.missionCategoryRepository.getCategoryByName(createMissionCategoryDTO.category);

        if (existing_category) {
            throw new BadRequestException(`Categoria ${createMissionCategoryDTO.category} já existe.`);
        };

        const existing_category_level = await this.missionCategoryRepository.getCategoryByLevel(createMissionCategoryDTO.level);

        if (existing_category_level) {
            throw new BadRequestException(`Categoria com ${createMissionCategoryDTO.level} já existe.`);
        };

        const created_mission_category = this.missionCategoryRepository.createCategory(createMissionCategoryDTO);
        const saved_mission_category = await this.missionCategoryRepository.saveCategory(created_mission_category);

        return saved_mission_category;
    };

    async updateMissionCategory(updateMissionCategoryDTO: UpdateMissionCategoryDTO) {
        const category = await this.missionCategoryRepository.getCategoryById(updateMissionCategoryDTO.category_id);

        if (!category) {
            throw new NotFoundException(`Categoria com id ${updateMissionCategoryDTO.category_id} não encontrada.`);
        };

        if (updateMissionCategoryDTO?.category) {
            if (updateMissionCategoryDTO.category.length < this.MIN_CATEGORY_LENGTH) {
                throw new BadRequestException(`Categoria da missão deve ter no mínimo ${this.MIN_CATEGORY_LENGTH} caracteres.`);
            };

            const existing_category = await this.missionCategoryRepository.getCategoryByName(updateMissionCategoryDTO.category);

            if (existing_category) {
                throw new BadRequestException(`Categoria ${updateMissionCategoryDTO.category} já existe.`);
            };
        };

        if (updateMissionCategoryDTO?.level) {
            const existing_category_level = await this.missionCategoryRepository.getCategoryByLevel(updateMissionCategoryDTO.level);

            if (existing_category_level) {
                throw new BadRequestException(`Categoria com ${updateMissionCategoryDTO.level} já existe.`);
            };
        };

        if (updateMissionCategoryDTO?.description) {
            if (updateMissionCategoryDTO.description.length < this.MIN_CATEGORY_DESCRIPTION_LENGTH) {
                throw new BadRequestException(`Descrição da categoria da missão deve ter no mínimo ${this.MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`);
            };
        };

        category.category = updateMissionCategoryDTO?.category ?? category.category;
        category.description = updateMissionCategoryDTO?.description ?? category.description;
        category.level = updateMissionCategoryDTO?.level ?? category.level;

        const updated_category = await this.missionCategoryRepository.saveCategory(category);

        return updated_category;
    };
}