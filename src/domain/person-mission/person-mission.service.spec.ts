import { PersonMissionRepositoryImpl } from "src/infrastructure/database/person-mission/person-mission.repository";
import { PersonMissionService } from "./person-mission.service";
import { CreatePersonMissionDTO } from "src/presentation/person-mission/person-mission.dto";
import { Test, TestingModule } from "@nestjs/testing";

describe('PersonMissionService', () => {
    let service: PersonMissionService;
    let repository: PersonMissionRepositoryImpl;
    const MIN_NAME_PERSON_LENGTH = 3;

    const mission_id = "e171bb26-444a-4ffb-b802-595941433460";

    const validPersonMissionDTO: CreatePersonMissionDTO = {
        age: 11,
        color: "branca",
        name: "Clara de Oliveira",
        hair: "Castanho claro"
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PersonMissionService,
                {
                    provide: PersonMissionRepositoryImpl,
                    useValue: {
                        getPersonMissionByMissionId: jest.fn(),
                        createPersonMission: jest.fn(),
                        savePersonMission: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<PersonMissionService>(PersonMissionService);
        repository = module.get<PersonMissionRepositoryImpl>(PersonMissionRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createPersonMission', () => {
        it('should throw an error if name is less than 3 characters', async () => {
            const invalidPersonMissionDTO = {
                ...validPersonMissionDTO,
                name: "Cl"
            };

            await expect(service.createPersonMission(invalidPersonMissionDTO, mission_id, undefined)).rejects.toThrow(`Nome deve ter no mínimo ${MIN_NAME_PERSON_LENGTH} caracteres.`);
        });

        it('should throw BadRequestException if color is invalid', async () => {
            const invalidPersonDTO: CreatePersonMissionDTO = {
                ...validPersonMissionDTO,
                color: 'INVALID_COLOR',
            };

            await expect(service.createPersonMission(invalidPersonDTO, mission_id)).rejects.toThrow(`Cor inválida: ${invalidPersonDTO.color}.`);
        });

        it('should successfully create a person mission', async () => {
            jest.spyOn(repository, 'createPersonMission').mockReturnValue(validPersonMissionDTO as any);
            jest.spyOn(repository, 'savePersonMission').mockResolvedValue(validPersonMissionDTO as any);

            const result = await service.createPersonMission(validPersonMissionDTO, mission_id, undefined);

            expect(result).toEqual(validPersonMissionDTO);
        });
    });
});