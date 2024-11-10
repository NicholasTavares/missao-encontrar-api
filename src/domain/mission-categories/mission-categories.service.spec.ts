import { CreateMissionCategoryDTO, UpdateMissionCategoryDTO } from "src/presentation/mission-categories/mission-categories.dto";
import { MissionCategoryService } from "./mission-categories.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MissionCategoriesRepositoryImpl } from "src/infrastructure/database/mission-categories/mission-categories.repository";

describe('MissionCategoryService', () => {
    let service: MissionCategoryService;
    let repository: MissionCategoriesRepositoryImpl;
    const MIN_CATEGORY_LENGTH = 3;
    const MIN_CATEGORY_DESCRIPTION_LENGTH = 5;

    const validMissionCategoryDTO: CreateMissionCategoryDTO = {
        category: "pet",
        description: "Categoria de animais domésticos.",
        level: 2
    };

    const validUpdateMissionDTO: UpdateMissionCategoryDTO = {
        category_id: "e171bb26-444a-4ffb-b802-595941433460",
        category: "pet",
        description: "Categoria de animais domésticos.",
        level: 2
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MissionCategoryService,
                {
                    provide: MissionCategoriesRepositoryImpl,
                    useValue: {
                        getCategoryByName: jest.fn(),
                        createCategory: jest.fn(),
                        saveCategory: jest.fn(),
                        getCategoryById: jest.fn(),
                        getCategoryByLevel: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<MissionCategoryService>(MissionCategoryService);
        repository = module.get<MissionCategoriesRepositoryImpl>(MissionCategoriesRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getMissionCategoryById', () => {
        it(`should throw NotFoundException if category id does not exists`, async () => {
            const category_id = 'e171bb26-444a-4ffb-b802-595941433460';

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(null);

            await expect(service.getMissionCategoryById(category_id)).rejects.toThrow(
                `Categoria com id ${category_id} não encontrada.`,
            );
        });

        it('should return category successfully', async () => {
            const existingCategory = {
                id: validUpdateMissionDTO.category_id,
                level: 2,
                description: "Categoria de animais domésticos.",
                category: 'old-category-name',
                created_at: new Date(),
                updated_at: new Date(),
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(existingCategory as any);

            const result = await service.getMissionCategoryById(existingCategory.id);
            expect(repository.getCategoryById).toHaveBeenCalledWith(existingCategory.id, undefined);
            expect(result).toEqual(existingCategory);
        });
    });

    describe('createCategoryMission', () => {
        it(`should throw BadRequestException if category is less than ${MIN_CATEGORY_LENGTH} characters`, async () => {
            const dto = { ...validMissionCategoryDTO, category: 'pe' };

            await expect(service.createMissionCategory(dto)).rejects.toThrow(
                `Categoria da missão deve ter no mínimo ${MIN_CATEGORY_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if category description is less than ${MIN_CATEGORY_DESCRIPTION_LENGTH} characters`, async () => {
            const dto = { ...validMissionCategoryDTO, description: 'desc' };

            await expect(service.createMissionCategory(dto)).rejects.toThrow(
                `Descrição da categoria da missão deve ter no mínimo ${MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if category already exists`, async () => {
            const dto = { ...validMissionCategoryDTO, category: 'pet' };

            jest.spyOn(repository, 'getCategoryByName').mockResolvedValueOnce(validMissionCategoryDTO as any);

            await expect(service.createMissionCategory(dto)).rejects.toThrow(
                `Categoria ${dto.category} já existe.`,
            );
        });

        it(`should throw BadRequestException if category level already exists`, async () => {
            const dto = { ...validMissionCategoryDTO };

            jest.spyOn(repository, 'getCategoryByLevel').mockResolvedValueOnce(validMissionCategoryDTO as any);

            await expect(service.createMissionCategory(dto)).rejects.toThrow(
                `Categoria com ${dto.level} já existe.`,
            );
        });

        it('should create and save mission category successfully', async () => {
            jest.spyOn(repository, 'getCategoryByName').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'getCategoryByLevel').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'createCategory').mockReturnValue(validMissionCategoryDTO as any);
            jest.spyOn(repository, 'saveCategory').mockResolvedValueOnce(validMissionCategoryDTO as any);

            const result = await service.createMissionCategory(validMissionCategoryDTO);

            expect(repository.getCategoryByName).toHaveBeenCalledWith(validMissionCategoryDTO.category);
            expect(repository.createCategory).toHaveBeenCalledWith(validMissionCategoryDTO);
            expect(repository.saveCategory).toHaveBeenCalledWith(validMissionCategoryDTO);
            expect(result).toEqual(validMissionCategoryDTO);
        });
    })

    describe('updateCategoryMission', () => {
        it(`should throw NotFoundException if category id does not exists`, async () => {
            const dto = { ...validUpdateMissionDTO, category: 'pet' };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(null);

            await expect(service.updateMissionCategory(dto)).rejects.toThrow(
                `Categoria com id ${dto.category_id} não encontrada.`,
            );
        });

        it(`should throw BadRequestException if category is less than ${MIN_CATEGORY_LENGTH} characters`, async () => {
            const dto = { ...validUpdateMissionDTO, category: 'pe' };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMissionCategory(dto)).rejects.toThrow(
                `Categoria da missão deve ter no mínimo ${MIN_CATEGORY_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if category description is less than ${MIN_CATEGORY_LENGTH} characters`, async () => {
            const dto = { ...validUpdateMissionDTO, description: 'test' };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMissionCategory(dto)).rejects.toThrow(
                `Descrição da categoria da missão deve ter no mínimo ${MIN_CATEGORY_DESCRIPTION_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if category level already exists`, async () => {
            const dto = { ...validUpdateMissionDTO, level: 1 };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(validUpdateMissionDTO as any);
            jest.spyOn(repository, 'getCategoryByLevel').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMissionCategory(dto)).rejects.toThrow(
                `Categoria com ${dto.level} já existe.`,
            );
        });

        it(`should throw BadRequestException if category already exists`, async () => {
            const dto = { ...validUpdateMissionDTO, category: 'pet' };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(validUpdateMissionDTO as any);
            jest.spyOn(repository, 'getCategoryByName').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMissionCategory(dto)).rejects.toThrow(
                `Categoria ${dto.category} já existe.`,
            );
        });

        it('should update mission category successfully', async () => {
            const existingCategory = {
                id: validUpdateMissionDTO.category_id,
                level: 2,
                description: "Categoria de animais domésticos.",
                category: 'old-category-name',
                created_at: new Date("2024-11-10T16:08:03.440Z"),
                updated_at: new Date("2024-11-10T16:08:03.440Z"),
            };

            const updatedCategory = {
                ...existingCategory,
                category: validUpdateMissionDTO.category,
                updated_at: new Date("2024-11-10T16:08:03.440Z"),
            };

            jest.spyOn(repository, 'getCategoryById').mockResolvedValueOnce(existingCategory);
            jest.spyOn(repository, 'getCategoryByName').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'saveCategory').mockResolvedValueOnce(updatedCategory);

            const result = await service.updateMissionCategory(validUpdateMissionDTO);

            expect(repository.getCategoryById).toHaveBeenCalledWith(validUpdateMissionDTO.category_id);
            expect(repository.getCategoryByName).toHaveBeenCalledWith(validUpdateMissionDTO.category);
            expect(repository.saveCategory).toHaveBeenCalledWith(updatedCategory);
            expect(result).toEqual(updatedCategory);
        });
    });
});