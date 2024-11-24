import { ObjectMissionCategoryRepositoryImpl } from "src/infrastructure/database/object-mission-categories/object-mission-categories.repository";
import { ObjectMissionCategoriesService } from "./object-mission-categories.service";
import { Test, TestingModule } from "@nestjs/testing";

describe('ObjectMissionCategoriesService', () => {
    let service: ObjectMissionCategoriesService;
    let repository: ObjectMissionCategoryRepositoryImpl;

    const MIN_CATEGORY_LENGTH = 3;
    const MIN_CATEGORY_DESCRIPTION_LENGTH = 5;

    const mission_id = 'e171bb26-444a-4ffb-b802-595941433460';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ObjectMissionCategoriesService,
                {
                    provide: ObjectMissionCategoryRepositoryImpl,
                    useValue: {
                        getCategoryById: jest.fn(),
                        getCategoryByName: jest.fn(),
                        createObjectMissionCategory: jest.fn(),
                        saveObjectMissionCategory: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<ObjectMissionCategoriesService>(ObjectMissionCategoriesService);
        repository = module.get<ObjectMissionCategoryRepositoryImpl>(ObjectMissionCategoryRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getMissionCategoryById', () => {
        it('should return a category', async () => {
            const category = {
                id: mission_id,
                category: 'category',
                description: 'description'
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(category as any);

            const result = await service.getMissionCategoryById(mission_id);

            expect(result).toEqual(category);
        });

        it('should throw an error if category is not found', async () => {
            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(null);

            await expect(service.getMissionCategoryById(mission_id)).rejects.toThrow(`Categoria com id ${mission_id} não encontrada.`);
        });
    });

    describe('createObjectMissionCategory', () => {
        it('should throw an error if category name already exists', async () => {
            const category = {
                category: 'category',
                description: 'description'
            };

            jest.spyOn(repository, 'getCategoryByName').mockResolvedValue(category as any);

            await expect(service.createObjectMissionCategory(category)).rejects.toThrow(`Categoria ${category.category} já existe.`);
        });

        it(`should throw an error if category name is less than ${MIN_CATEGORY_LENGTH} characters`, async () => {
            const category = {
                category: 'ca',
                description: 'description'
            };

            await expect(service.createObjectMissionCategory(category)).rejects.toThrow(`Categoria do objeto deve ter no mínimo ${MIN_CATEGORY_LENGTH} caracteres.`);
        });

        it(`should throw an error if category description is less than ${MIN_CATEGORY_DESCRIPTION_LENGTH} characters`, async () => {
            const category = {
                category: 'category',
                description: 'desc'
            };

            await expect(service.createObjectMissionCategory(category)).rejects.toThrow(`Descrição da categoria do objeto deve ter no mínimo ${MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`);
        });

        it('should create a category successfuly', async () => {
            const category = {
                category: 'category',
                description: 'description'
            };

            jest.spyOn(repository, 'getCategoryByName').mockResolvedValue(null);
            jest.spyOn(repository, 'createObjectMissionCategory').mockReturnValue(category as any);
            jest.spyOn(repository, 'saveObjectMissionCategory').mockResolvedValue(category as any);

            const result = await service.createObjectMissionCategory(category);

            expect(result).toEqual(category);
        });
    });

    describe('updateObjectMissionCategory', () => {
        it('should throw an error if category is not found', async () => {
            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(null);

            await expect(service.updateObjectMissionCategory({ category_id: mission_id })).rejects.toThrow(`Categoria com id ${mission_id} não encontrada.`);
        });

        it('should throw an error if category name already exists', async () => {
            const category = {
                category: 'category',
                description: 'description'
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(category as any);
            jest.spyOn(repository, 'getCategoryByName').mockResolvedValue(category as any);

            await expect(service.updateObjectMissionCategory({ category_id: mission_id, category: 'category' })).rejects.toThrow(`Categoria ${category.category} já existe.`);
        });

        it(`should throw an error if category name is less than ${MIN_CATEGORY_LENGTH} characters`, async () => {
            const category = {
                category: 'ca',
                description: 'description'
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(category as any);

            await expect(service.updateObjectMissionCategory({ category_id: mission_id, category: 'ca' })).rejects.toThrow(`Categoria do objeto deve ter no mínimo ${MIN_CATEGORY_LENGTH} caracteres.`);
        });

        it(`should throw an error if category description is less than ${MIN_CATEGORY_DESCRIPTION_LENGTH} characters`, async () => {
            const category = {
                category: 'category',
                description: 'desc'
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(category as any);

            await expect(service.updateObjectMissionCategory({ category_id: mission_id, description: 'desc' })).rejects.toThrow(`Descrição da categoria do objeto deve ter no mínimo ${MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`);
        });

        it('should update a category successfuly', async () => {
            const category = {
                category: 'category',
                description: 'description'
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValue(category as any);
            jest.spyOn(repository, 'getCategoryByName').mockResolvedValue(null);
            jest.spyOn(repository, 'saveObjectMissionCategory').mockResolvedValue({ ...category, category: 'new category' } as any);

            const result = await service.updateObjectMissionCategory({ category_id: mission_id, category: 'new category' });

            expect(result.category).toEqual('new category');
        });
    });

});