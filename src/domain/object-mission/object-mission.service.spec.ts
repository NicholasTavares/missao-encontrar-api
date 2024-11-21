import { ObjectMissionRepositoryImpl } from "src/infrastructure/database/object-mission/object-mission.repository";
import { ObjectMissionService } from "./object-mission.service";
import { CreateObjectMissionDTO } from "src/presentation/object-mission/object-mission.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { ObjectMissionCategoryEntity } from "../object-mission-categories/object-mission-categories.entity";

describe('ObjectMissionService', () => {
    let service: ObjectMissionService;
    let repository: ObjectMissionRepositoryImpl;
    const MIN_OBJECT_NAME_LENGTH = 3;
    const MIN_OBJECT_DESCRIPTION_LENGTH = 6;

    const mission_id = 'e171bb26-444a-4ffb-b802-595941433460';

    const validObjectMissionCategoryDTO: CreateObjectMissionDTO = {
        object_category_id: "e171bb26-444a-4ffb-b802-595941433460",
        object_name: "Iphone 13",
        description: "Iphone com capinha azul.",
    };

    const validObjectMissionCategoryEntity: ObjectMissionCategoryEntity = {
        id: 'e171bb26-444a-4ffb-b802-595941433460',
        category: "Celular",
        description: "Categoria indicada para aparelho celular/smartphone.",
        created_at: new Date(),
        updated_at: new Date(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ObjectMissionService,
                {
                    provide: ObjectMissionRepositoryImpl,
                    useValue: {
                        getObjectMissionByMissionId: jest.fn(),
                        createObjectMission: jest.fn(),
                        saveObjectMission: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<ObjectMissionService>(ObjectMissionService);
        repository = module.get<ObjectMissionRepositoryImpl>(ObjectMissionRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getObjectMissionByMissionId', () => {
        it(`should throw NotFoundException if mission object category id does not exists`, async () => {
            const mission_id = 'e171bb26-444a-4ffb-b802-595941433460';

            jest.spyOn(repository, 'getObjectMissionByMissionId').mockResolvedValueOnce(null);

            await expect(service.getObjectMissionByMissionId(mission_id)).rejects.toThrow(
                `Objeto de missão ${mission_id} não encontrado.`,
            );
        });

        it('should return mission object category successfully', async () => {
            const existingCategory = {
                id: 'e171bb26-444a-4ffb-b802-595941433460',
                object_name: "Iphone 13",
                description: "Iphone com capinha azul.",
                created_at: new Date(),
                updated_at: new Date(),
            };

            jest.spyOn(repository, 'getObjectMissionByMissionId').mockResolvedValueOnce(existingCategory as any);

            const result = await service.getObjectMissionByMissionId(existingCategory.id);
            expect(repository.getObjectMissionByMissionId).toHaveBeenCalledWith(existingCategory.id);
            expect(result).toEqual(existingCategory);
        });
    });

    describe('createObjectMission', () => {
        it('should throw BadRequestException if object name is less than 3 characters', async () => {
            const invalidDto = {
                ...validObjectMissionCategoryDTO,
                object_name: "Ip",
            };

            await expect(service.createObjectMission(invalidDto, mission_id, validObjectMissionCategoryEntity)).rejects.toThrow(
                `Nome do objeto deve ter no mínimo ${MIN_OBJECT_NAME_LENGTH} caracteres.`,
            );
        });

        it('should throw BadRequestException if object description is less than 6 characters', async () => {
            const invalidDto = {
                ...validObjectMissionCategoryDTO,
                description: 'test'
            };

            await expect(service.createObjectMission(invalidDto, mission_id, validObjectMissionCategoryEntity)).rejects.toThrow(
                `Descrição do objeto deve ter no mínimo ${MIN_OBJECT_DESCRIPTION_LENGTH} caracteres.`,
            );
        });

        it('should create object mission successfully', async () => {
            jest.spyOn(repository, 'createObjectMission').mockReturnValue(validObjectMissionCategoryDTO as any);
            jest.spyOn(repository, 'saveObjectMission').mockReturnValue(validObjectMissionCategoryDTO as any);

            const result = await service.createObjectMission(validObjectMissionCategoryDTO, mission_id, validObjectMissionCategoryEntity);
            expect(repository.createObjectMission).toHaveBeenCalledWith(validObjectMissionCategoryDTO);
            expect(result).toEqual(validObjectMissionCategoryDTO);
        });
    });
});