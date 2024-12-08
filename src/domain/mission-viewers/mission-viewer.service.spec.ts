import { MissionViewersRepositoryImpl } from "src/infrastructure/database/mission-viewers/mission-viewers.repository";
import { MissionViewerService } from "./mission-viewer.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MissionViewerEntity } from "./mission-viewer.entity";
import { CreateMissionViewerDTO } from "src/presentation/mission-viewers/mission-viewers.dto";

describe('MissionViewerService', () => {
    let service: MissionViewerService;
    let repository: MissionViewersRepositoryImpl;

    const createMissionViewerDTO: CreateMissionViewerDTO = {
        mission_id: 'e171bb26-444a-4ffb-b802-595941433460',
        user_id: '8a93966f-b04b-4b97-8195-7cb5a53a6c1a',
        device_info: 'device_info'
    };

    const MissionViewerEntity: MissionViewerEntity = {
        id: '68ec1990-2b3a-4aa5-8999-6ee3265fa765',
        mission_id: 'e171bb26-444a-4ffb-b802-595941433460',
        user_id: '8a93966f-b04b-4b97-8195-7cb5a53a6c1a',
        viewed_at: new Date(),
        device_info: 'device_info'
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MissionViewerService,
                {
                    provide: MissionViewersRepositoryImpl,
                    useValue: {
                        getMissionViewerByUserIdAndMissionId: jest.fn(),
                        getMissionViewerCountByMissionId: jest.fn(),
                        createMissionViewer: jest.fn(),
                        saveMissionViewer: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<MissionViewerService>(MissionViewerService);
        repository = module.get<MissionViewersRepositoryImpl>(MissionViewersRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getMissionViewerByUserIdAndMissionId', () => {
        it('should return mission viewer', async () => {
            const mission_id = 'e171bb26-444a-4ffb-b802-595941433460';
            const user_id = '8a93966f-b04b-4b97-8195-7cb5a53a6c1a';

            jest.spyOn(repository, 'getMissionViewerByUserIdAndMissionId').mockResolvedValue(MissionViewerEntity as any);

            const result = await service.getMissionViewerByUserIdAndMissionId(user_id, mission_id);

            expect(result).toBe(MissionViewerEntity);
        });
    });

    describe('createMissionViewer', () => {
        it('should create mission viewer', async () => {
            jest.spyOn(repository, 'createMissionViewer').mockReturnValue(createMissionViewerDTO as any);
            jest.spyOn(repository, 'saveMissionViewer').mockResolvedValue(createMissionViewerDTO as any);

            const result = await service.createMissionViewer(createMissionViewerDTO);

            expect(repository.createMissionViewer).toHaveBeenCalled();
            expect(repository.saveMissionViewer).toHaveBeenCalled();
            expect(result).toBe(createMissionViewerDTO);
        });
    });

    describe('getMissionViewersCountById', () => {
        it('should return mission viewer count', async () => {
            const mission_id = 'e171bb26-444a-4ffb-b802-595941433460';

            jest.spyOn(repository, 'getMissionViewerCountByMissionId').mockResolvedValue(1);

            const result = await service.getMissionViewersCountById(mission_id);

            expect(result).toBe(1);
        });
    });
});