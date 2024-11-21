import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ObjectMissionCategoryRepositoryImpl } from 'src/infrastructure/database/object-mission-categories/object-mission-categories.repository';
import { CreateObjectMissionCategoryDTO, UpdateObjectMissionCategoryDTO } from 'src/presentation/object-mission-categories/object-mission.dto';
import { ObjectMissionCategoryEntity } from './object-mission-categories.entity';

@Injectable()
export class ObjectMissionCategoriesService {
    private readonly MIN_CATEGORY_LENGTH = 3;
    private readonly MIN_CATEGORY_DESCRIPTION_LENGTH = 5;
    constructor(private readonly objectMissionCategoryRepository: ObjectMissionCategoryRepositoryImpl) { }

    async getMissionCategoryById(category_id: string, transactionManager?: EntityManager): Promise<ObjectMissionCategoryEntity | null> {
        const category = await this.objectMissionCategoryRepository.getCategoryById(category_id, transactionManager);

        if (!category) {
            throw new NotFoundException(`Categoria com id ${category_id} não encontrada.`);
        };

        return category;
    };

    async createObjectMissionCategory(createObjectMissionCategoryDTO: CreateObjectMissionCategoryDTO) {
        if (createObjectMissionCategoryDTO.category.length < this.MIN_CATEGORY_LENGTH) {
            throw new BadRequestException(`Categoria do objeto deve ter no mínimo ${this.MIN_CATEGORY_LENGTH} caracteres.`);
        };

        if (createObjectMissionCategoryDTO.description.length < this.MIN_CATEGORY_DESCRIPTION_LENGTH) {
            throw new BadRequestException(`Descrição da categoria do objeto deve ter no mínimo ${this.MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`);
        };

        const existing_category = await this.objectMissionCategoryRepository.getCategoryByName(createObjectMissionCategoryDTO.category);

        if (existing_category) {
            throw new BadRequestException(`Categoria ${createObjectMissionCategoryDTO.category} já existe.`);
        };

        const created_object_mission_category = this.objectMissionCategoryRepository.createObjectMissionCategory(createObjectMissionCategoryDTO);
        const saved_object_mission_category = await this.objectMissionCategoryRepository.saveObjectMissionCategory(created_object_mission_category);

        return saved_object_mission_category;
    };

    async updateObjectMissionCategory(updateObjectMissionCategoryDTO: UpdateObjectMissionCategoryDTO) {
        const category = await this.objectMissionCategoryRepository.getCategoryById(updateObjectMissionCategoryDTO.category_id);

        if (!category) {
            throw new NotFoundException(`Categoria com id ${updateObjectMissionCategoryDTO.category_id} não encontrada.`);
        };

        if (updateObjectMissionCategoryDTO?.category) {
            if (updateObjectMissionCategoryDTO.category.length < this.MIN_CATEGORY_LENGTH) {
                throw new BadRequestException(`Categoria do objeto deve ter no mínimo ${this.MIN_CATEGORY_LENGTH} caracteres.`);
            };

            const existing_category = await this.objectMissionCategoryRepository.getCategoryByName(updateObjectMissionCategoryDTO.category);

            if (existing_category) {
                throw new BadRequestException(`Categoria ${updateObjectMissionCategoryDTO.category} já existe.`);
            };
        };

        if (updateObjectMissionCategoryDTO?.description) {
            if (updateObjectMissionCategoryDTO.description.length < this.MIN_CATEGORY_DESCRIPTION_LENGTH) {
                throw new BadRequestException(`Descrição da categoria do objeto deve ter no mínimo ${this.MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`);
            };
        };

        category.category = updateObjectMissionCategoryDTO?.category ?? category.category;
        category.description = updateObjectMissionCategoryDTO?.description ?? category.description;

        const updated_category = await this.objectMissionCategoryRepository.saveObjectMissionCategory(category);

        return updated_category;
    };
}