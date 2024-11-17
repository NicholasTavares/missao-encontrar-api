import { PetMissionRepositoryImpl } from "src/infrastructure/database/pet-mission/pet-mission.repository";
import { PetMissionService } from "./pet-mission.service";
import { CreatePetMissionDTO } from "src/presentation/pet-mission/pet-mission.dto";
import { Test, TestingModule } from "@nestjs/testing";

describe('PetMissionService', () => {
    let service: PetMissionService;
    let repository: PetMissionRepositoryImpl;
    const MIN_NAME_PET_LENGTH = 3;
    const MIN_PREDOMINANT_COLOR_LENGTH = 3;

    const mission_id = "e171bb26-444a-4ffb-b802-595941433460";

    const validPersonMissionDTO: CreatePetMissionDTO = {
        age: 5,
        predominant_color: "branco",
        sex: "macho",
        name: "Bob",
        pet_species: "poodle"
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PetMissionService,
                {
                    provide: PetMissionRepositoryImpl,
                    useValue: {
                        getPetMissionByMissionId: jest.fn(),
                        createPetMission: jest.fn(),
                        savePetMission: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<PetMissionService>(PetMissionService);
        repository = module.get<PetMissionRepositoryImpl>(PetMissionRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createPetMission', () => {
        it('should throw an error if name is less than 3 characters', async () => {
            const invalidPersonMissionDTO = { ...validPersonMissionDTO, name: "Bo" };

            try {
                await service.createPetMission(invalidPersonMissionDTO, mission_id);
            } catch (error) {
                expect(error.message).toBe(`Nome deve ter no mínimo ${MIN_NAME_PET_LENGTH} caracteres.`);
            }
        });

        it('should throw an error if predominant_color is less than 3 characters', async () => {
            const invalidPersonMissionDTO = { ...validPersonMissionDTO, predominant_color: "br" };

            try {
                await service.createPetMission(invalidPersonMissionDTO, mission_id);
            } catch (error) {
                expect(error.message).toBe(`Cor deve ter no mínimo ${MIN_PREDOMINANT_COLOR_LENGTH} caracteres.`);
            }
        });

        it('should throw BadRequestException if sex is invalid', async () => {
            const invalidPetDTO: CreatePetMissionDTO = {
                ...validPersonMissionDTO,
                sex: 'INVALID_SEX',
            };

            await expect(service.createPetMission(invalidPetDTO, mission_id)).rejects.toThrow(`Sexo inválido: ${invalidPetDTO.sex}.`);
        });

        it('should create a person mission successfully', async () => {
            jest.spyOn(repository, 'createPetMission').mockReturnValue(validPersonMissionDTO as any);
            jest.spyOn(repository, 'savePetMission').mockResolvedValue(validPersonMissionDTO as any);

            const result = await service.createPetMission(validPersonMissionDTO, mission_id);

            expect(result).toEqual(validPersonMissionDTO);
        });
    });

    describe('getPetMissionByMissionId', () => {
        it('should throw an error if pet mission is not found', async () => {
            jest.spyOn(repository, 'getPetMissionByMissionId').mockResolvedValue(null);

            try {
                await service.getPetMissionByMissionId(mission_id);
            } catch (error) {
                expect(error.message).toBe(`Missão com id ${mission_id} não encontrada.`);
            }
        });

        it('should return a pet mission', async () => {
            jest.spyOn(repository, 'getPetMissionByMissionId').mockResolvedValue(validPersonMissionDTO as any);

            const result = await service.getPetMissionByMissionId(mission_id);

            expect(result).toEqual(validPersonMissionDTO);
        });
    });
});