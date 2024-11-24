import { MissionTimelineRepositoryImpl } from "src/infrastructure/database/mission-timeline/mission-timeline.repository";
import { MissionTimelineService } from "./mission-timeline.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateMissionTimelineDTO, UpdateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";
import { MissionTimelineEntity } from "./mission-timeline.entity";

describe('MissionTimelineService', () => {
    let service: MissionTimelineService;
    let repository: MissionTimelineRepositoryImpl;
    const MIN_TIMELINE_TITLE_LENGHT = 2;
    const MIN_TIMELINE_DESCRIPTION_LENGHT = 5;

    const mission_id = 'e171bb26-444a-4ffb-b802-595941433460';

    const validMissionTimeline: CreateMissionTimelineDTO = {
        title: "Uma documento foi entrando",
        description: "Bilhete encontrado",
        mission_id,
        update_type: "INFO",
        user_id: mission_id,
        visibility: "ALL",
    };

    const validUpdateMissionTimeline: UpdateMissionTimelineDTO = {
        title: "Uma documento foi entrando",
        description: "Bilhete encontrado",
        update_type: "INFO",
        visibility: "ALL",
    };

    const missionTimelineEntity: MissionTimelineEntity = {
        "id": "a6021ca5-1f9f-4cea-8b84-b5be9a544b7e",
        "title": "PM SC",
        "description": "O caso foi passado para a PM de Santa Catarina.",
        "update_type": "TIP",
        "visibility": "ALL",
        "user_id": "677f78ff-b02c-42a5-b062-40918fdde2d2",
        "mission_id": "68ec1990-2b3a-4aa5-8999-6ee3265fa765",
        "created_at": new Date("2024-11-24T16:26:39.464Z"),
        "updated_at": new Date("2024-11-24T16:28:52.310Z"),
        "deleted_at": null
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MissionTimelineService,
                {
                    provide: MissionTimelineRepositoryImpl,
                    useValue: {
                        getAllMissionsTimelineByMissionId: jest.fn(),
                        updateMissionTimeline: jest.fn(),
                        createMissionTimeline: jest.fn(),
                        saveMissionTimeline: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<MissionTimelineService>(MissionTimelineService);
        repository = module.get<MissionTimelineRepositoryImpl>(MissionTimelineRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getMissionTimelineByMissionId', () => {
        it('should return a list of time line mission', async () => {
            const mission_timelines = [validMissionTimeline];
            jest.spyOn(repository, 'getAllMissionsTimelineByMissionId').mockResolvedValueOnce(mission_timelines as any);

            const result = await service.getMissionTimelineByMissionId(mission_id);

            expect(repository.getAllMissionsTimelineByMissionId).toHaveBeenCalledWith(mission_id);
            expect(result).toEqual(mission_timelines);
        });
    });

    describe('createMissionTimeline', () => {
        it(`should throw BadRequestException if title lenght is lower than ${MIN_TIMELINE_TITLE_LENGHT}`, async () => {
            const dto = { ...validMissionTimeline, title: 't' }

            await expect(service.createMissionTimeline(dto)).rejects.toThrow(
                `Título deve ter no mínimo ${MIN_TIMELINE_TITLE_LENGHT} caracteres.`,
            );
        });

        it(`should throw BadRequestException if description lenght is lower than ${MIN_TIMELINE_DESCRIPTION_LENGHT}`, async () => {
            const dto = { ...validMissionTimeline, description: 'test' }

            await expect(service.createMissionTimeline(dto)).rejects.toThrow(
                `Descrição deve ter no mínimo ${MIN_TIMELINE_DESCRIPTION_LENGHT} caracteres.`,
            );
        });

        it(`should throw BadRequestException if update_type is invalid`, async () => {
            const dto = { ...validMissionTimeline, update_type: 'test' }

            await expect(service.createMissionTimeline(dto)).rejects.toThrow(
                `Tipo inválido de timeline: ${dto.update_type}.`,
            );
        });

        it(`should throw BadRequestException if visibility lenght is invalid`, async () => {
            const dto = { ...validMissionTimeline, visibility: 'test' }

            await expect(service.createMissionTimeline(dto)).rejects.toThrow(
                `Tipo inválido de visibilidade timeline: ${dto.visibility}.`,
            );
        });

        it('should create a mission timeline successfully', async () => {
            jest.spyOn(repository, 'createMissionTimeline').mockReturnValue(validMissionTimeline as any);
            jest.spyOn(repository, 'saveMissionTimeline').mockResolvedValueOnce(validMissionTimeline as any);

            const result = await service.createMissionTimeline(validMissionTimeline);

            expect(repository.saveMissionTimeline).toHaveBeenCalled();
            expect(result).toEqual(validMissionTimeline);
        })
    });

    describe('updateMissionTimeline', () => {
        it(`should throw BadRequestException if title lenght is lower than ${MIN_TIMELINE_TITLE_LENGHT}`, async () => {
            const dto = { ...validUpdateMissionTimeline, title: 't' }

            await expect(service.updateMissionTimeline(missionTimelineEntity, dto)).rejects.toThrow(
                `Título deve ter no mínimo ${MIN_TIMELINE_TITLE_LENGHT} caracteres.`,
            );
        });

        it(`should throw BadRequestException if description lenght is lower than ${MIN_TIMELINE_DESCRIPTION_LENGHT}`, async () => {
            const dto = { ...validUpdateMissionTimeline, description: 'test' }

            await expect(service.updateMissionTimeline(missionTimelineEntity, dto)).rejects.toThrow(
                `Descrição deve ter no mínimo ${MIN_TIMELINE_DESCRIPTION_LENGHT} caracteres.`,
            );
        });


        it('should update a mission timeline successfully', async () => {
            jest.spyOn(repository, 'saveMissionTimeline').mockResolvedValueOnce(validUpdateMissionTimeline as any);

            const result = await service.updateMissionTimeline(missionTimelineEntity, validUpdateMissionTimeline);

            expect(repository.saveMissionTimeline).toHaveBeenCalled();
            expect(result).toEqual(validUpdateMissionTimeline);
        })
    });
});