import { MissionRepositoryImpl } from "src/infrastructure/database/mission/mission.repository";
import { MissionService } from "./mission.service";
import { CreateMissionDTO, UpdateMissionDTO, UpdateMissionRewardsDTO } from "src/presentation/mission/mission.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { MissionEntity } from "./mission.entity";

describe('MissionService', () => {
    let service: MissionService;
    let repository: MissionRepositoryImpl;

    const MIN_TITLE_LENGTH = 3;
    const MIN_DESCRIPTION_LENGTH = 10;
    const MIN_REWARD_REAIS = 5;
    const MIN_REWARD_UPDATE_REAIS = 3;

    const mission_id = '8a93966f-b04b-4b97-8195-7cb5a53a6c1a';

    const validMissionDTO: CreateMissionDTO = {
        user_id: "8a93966f-b04b-4b97-8195-7cb5a53a6c1a",
        title: "Homem desaparecido",
        description: "Homem desaparecido perto do midway",
        mission_details_type: "PERSON",
        current_reward: 1000,
        latitude: -5.810069,
        longitude: -35.204835,
        category_id: "8a93966f-b04b-4b97-8195-7cb5a53a6c1a",
    };

    const validUpdateMissionDTO: UpdateMissionDTO = {
        mission_id: "8a93966f-b04b-4b97-8195-7cb5a53a6c1a",
        title: "Homem desaparecido",
        description: "Homem desaparecido perto do midway",
        latitude: -5.810069,
        longitude: -35.204835,
    };

    const validUpdateMissionRewardsDTO: UpdateMissionRewardsDTO = {
        mission_id: "8a93966f-b04b-4b97-8195-7cb5a53a6c1a",
        reward: 89
    }

    const validMissionCategory = {
        category_id: "e171bb26-444a-4ffb-b802-595941433460",
        category: "pet",
        description: "Categoria de animais domésticos.",
        level: 2,
        created_at: "2024-11-07T21:42:06.090Z",
        updated_at: "2024-11-07T21:42:06.090Z",
        deleted_at: null
    } as any;

    const missionEntity: MissionEntity = {
        id: mission_id,
        title: "Homem desaparecido",
        description: "Homem desaparecido perto do midway",
        mission_details_type: "PERSON",
        initial_reward: 500,
        current_reward: 500,
        latitude: -5.810069,
        longitude: -35.204835,
        user_id: "6c152c61-c0a8-44ed-b4d4-d3b3ef405446",
        lowest_reward: null,
        status: null,
        views_count: 0,
        created_at: new Date("2024-11-10T14:29:33.263Z"),
        updated_at: new Date("2024-11-10T14:29:33.263Z"),
        deleted_at: null
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MissionService,
                {
                    provide: MissionRepositoryImpl,
                    useValue: {
                        getMissionById: jest.fn(),
                        getAllMissions: jest.fn(),
                        createMission: jest.fn(),
                        saveOnCreateMission: jest.fn(),
                        saveMission: jest.fn(),
                        updateMissionRewards: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<MissionService>(MissionService);
        repository = module.get<MissionRepositoryImpl>(MissionRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getAllMissions', () => {
        it('should return all missions', async () => {
            const missions = [validMissionDTO];
            jest.spyOn(repository, 'getAllMissions').mockResolvedValueOnce(missions as any);

            const result = await service.getAllMissions();

            expect(repository.getAllMissions).toHaveBeenCalled();
            expect(result).toEqual(missions);
        });
    })

    describe('getMissionById', () => {
        it('should throw NotFoundException if mission is not found', async () => {
            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(null);

            await expect(service.getMissionById(mission_id)).rejects.toThrow(
                `Missão com id ${mission_id} não encontrada.`,
            );
        });

        it('should return mission successfully', async () => {
            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(missionEntity);

            const result = await service.getMissionById(mission_id);

            expect(repository.getMissionById).toHaveBeenCalledWith(mission_id, undefined);
            expect(result).toEqual(missionEntity);
        });
    })

    describe(('convertToCents'), () => {
        it('should convert a number to cents', () => {
            const result = service['convertToCents'](10);
            expect(result).toBe(1000);
        });
    });

    describe('createMission', () => {
        it(`should throw BadRequestException if title is less than ${MIN_TITLE_LENGTH} characters`, async () => {
            const dto = { ...validMissionDTO, title: 'Ho' };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `O título da missão deve ter no mínimo ${MIN_TITLE_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if description is less than ${MIN_DESCRIPTION_LENGTH} characters`, async () => {
            const dto = { ...validMissionDTO, description: 'test' };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `A descrição da missão deve ter no mínimo ${MIN_DESCRIPTION_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if current_reward is less than ${MIN_REWARD_REAIS} reais`, async () => {
            const dto = { ...validMissionDTO, current_reward: 4 };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `A recompensa da missão deve ser no mínimo ${MIN_REWARD_REAIS} reais.`,
            );
        });

        it(`should throw BadRequestException if latitude is defined and latitude not`, async () => {
            const dto = { ...validMissionDTO, latitude: -90, longitude: undefined };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validMissionDTO as any);

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `Coordenada inválida.`,
            );
        });

        it(`should throw BadRequestException if latitude is defined and longitude not`, async () => {
            const dto = { ...validMissionDTO, latitude: undefined, longitude: 180 };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validMissionDTO as any);

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `Coordenada inválida.`,
            );
        });

        it(`should throw BadRequestException if latitude is less than -90`, async () => {
            const dto = { ...validMissionDTO, latitude: -91 };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `Latitude inválida.`,
            );
        });

        it(`should throw BadRequestException if latitude is upper than 90`, async () => {
            const dto = { ...validMissionDTO, latitude: 91 };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `Latitude inválida.`,
            );
        });

        it(`should throw BadRequestException if longitude is less than -180`, async () => {
            const dto = { ...validMissionDTO, longitude: -181 };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `Longitude inválida.`,
            );
        });

        it(`should throw BadRequestException if longitude is upper than 180`, async () => {
            const dto = { ...validMissionDTO, longitude: 181 };

            await expect(service.createMission(dto, validMissionCategory)).rejects.toThrow(
                `Longitude inválida.`,
            );
        });

        it('should throw BadRequestException if mission_details_type is invalid', async () => {
            const invalidMissionDTO: CreateMissionDTO = {
                ...validMissionDTO,
                mission_details_type: 'INVALID_TYPE',
            };

            await expect(service.createMission(invalidMissionDTO, validMissionCategory)).rejects.toThrow(
                `Tipo da missão inválido: ${invalidMissionDTO.mission_details_type}.`,
            );
        });

        it('should create and save mission successfully', async () => {
            jest.spyOn(repository, 'createMission').mockReturnValue(validMissionDTO as any);
            jest.spyOn(repository, 'saveOnCreateMission').mockResolvedValueOnce({
                ...validMissionDTO,
                current_reward: 100000,
            } as any);

            const result = await service.createMission(validMissionDTO, validMissionCategory);

            expect(repository.createMission).toHaveBeenCalledWith({
                ...validMissionDTO,
                current_reward: 100000,
            });
            expect(repository.saveOnCreateMission).toHaveBeenCalled();
            // TODO: saveOnCreateMission não retorna um entidade, ver como tratar depois. Teste com falso positivo.
            expect(result).toEqual({
                ...validMissionDTO,
                current_reward: 100000,
            });
        });
    });

    describe('updateMission', () => {
        it(`should throw BadRequestException if title is less than ${MIN_TITLE_LENGTH} characters`, async () => {
            const dto = { ...validUpdateMissionDTO, title: 'Ho' };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `O título da missão deve ter no mínimo ${MIN_TITLE_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if description is less than ${MIN_DESCRIPTION_LENGTH} characters`, async () => {
            const dto = { ...validUpdateMissionDTO, description: 'test' };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `A descrição da missão deve ter no mínimo ${MIN_DESCRIPTION_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if latitude is defined and latitude not`, async () => {
            const dto = { ...validUpdateMissionDTO, latitude: -90, longitude: undefined };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `Coordenada inválida.`,
            );
        });

        it(`should throw BadRequestException if latitude is defined and longitude not`, async () => {
            const dto = { ...validUpdateMissionDTO, latitude: undefined, longitude: 180 };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `Coordenada inválida.`,
            );
        });

        it(`should throw BadRequestException if latitude is less than -90`, async () => {
            const dto = { ...validUpdateMissionDTO, latitude: -91 };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `Latitude inválida.`,
            );
        });

        it(`should throw BadRequestException if latitude is upper than 90`, async () => {
            const dto = { ...validUpdateMissionDTO, latitude: 91 };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `Latitude inválida.`,
            );
        });

        it(`should throw BadRequestException if longitude is less than -180`, async () => {
            const dto = { ...validUpdateMissionDTO, longitude: -181 };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(validUpdateMissionDTO as any);

            await expect(service.updateMission(dto, missionEntity)).rejects.toThrow(
                `Longitude inválida.`,
            );
        });

        it('should update mission successfully', async () => {
            const dto: UpdateMissionDTO = {
                mission_id: mission_id,
                title: "Novo Título da Missão",
                description: "Nova descrição atualizada da missão",
                latitude: -23.550520,
                longitude: -46.633308,
            };

            const existingMission = {
                id: mission_id,
                title: "Título Antigo",
                description: "Descrição antiga",
                latitude: -5.810069,
                longitude: -35.204835,
            };

            const updatedMission = {
                ...existingMission,
                ...dto,
            };

            jest.spyOn(repository, 'getMissionById').mockResolvedValueOnce(existingMission as any);
            jest.spyOn(repository, 'saveMission').mockResolvedValueOnce(updatedMission as any);

            const result = await service.updateMission(dto, missionEntity);

            expect(repository.saveMission).toHaveBeenCalled();
            expect(result).toEqual(updatedMission);
        });
    });

    describe('updateMissionRewards', () => {
        it('should throw BadRequestException if mission rewards candidate is lower that the current rewards', async () => {
            const dto = { ...validUpdateMissionRewardsDTO, reward: 5 };

            await expect(service.updateMissionRewards(dto, missionEntity)).rejects.toThrow(
                `A recompensa da missão não pode ser diminuída.`,
            );
        });

        it('should throw BadRequestException if mission rewards candidate does not reach the new minimum value.', async () => {
            const dto = { ...validUpdateMissionRewardsDTO, reward: 6 };

            await expect(service.updateMissionRewards(dto, missionEntity)).rejects.toThrow(
                `Novo valor da recompensa deve ser no mínimo ${MIN_REWARD_UPDATE_REAIS} reais maior que o valor atual.`,
            );
        });

        it('should update mission rewards successfully', async () => {
            jest.spyOn(repository, 'saveMission').mockResolvedValueOnce({
                ...validUpdateMissionRewardsDTO,
                current_reward: validUpdateMissionRewardsDTO.reward * 100
            } as any);

            const result = await service.updateMissionRewards(validUpdateMissionRewardsDTO, missionEntity);

            expect(repository.saveMission).toHaveBeenCalled();
            expect(result).toEqual({
                ...validUpdateMissionRewardsDTO,
                current_reward: validUpdateMissionRewardsDTO.reward * 100
            });
        })
    });
});