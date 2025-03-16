import { MissionDeleteReasonRepositoryImpl } from "src/infrastructure/database/mission-delete-reason/mission-delete-reason.repository";
import { MissionDeleteReasonService } from "./mission-delete-reason.service";
import { MissionDeleteReasonEntity } from "./mission-delete-reason.entity";
import { Test, TestingModule } from "@nestjs/testing";

describe('MissionDeleteReasonService', () => {
    let service: MissionDeleteReasonService;
    let repository: MissionDeleteReasonRepositoryImpl;

    const MIN_REASON_LENGTH = 5;

    const mission_id = "68ec1990-2b3a-4aa5-8999-6ee3265fa765";

    const missionFollowerEntity: MissionDeleteReasonEntity = {
        id: "9bb42e4a-1fc0-4f08-b8e6-cd8a7313d028",
        mission_id,
        reason: "Não quero mais.",
        created_at: new Date("2024-11-25T11:16:38.162Z")
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MissionDeleteReasonService,
                {
                    provide: MissionDeleteReasonRepositoryImpl,
                    useValue: {
                        createMissionDeleteReason: jest.fn(),
                        saveMissionDeleteReason: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<MissionDeleteReasonService>(MissionDeleteReasonService);
        repository = module.get<MissionDeleteReasonRepositoryImpl>(MissionDeleteReasonRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createMissionDeleteReason', () => {
        it(`should throw BadRequestException if reason is less than ${MIN_REASON_LENGTH} characters`, async () => {
            const dto = { ...missionFollowerEntity, reason: 'test' };

            await expect(service.createMissionDeleteReason(dto)).rejects.toThrow(
                `Razão deve ter no mínimo ${MIN_REASON_LENGTH} caracteres.`,
            );
        });


        it('should create mission delete reason and save mission successfully', async () => {
            jest.spyOn(repository, 'createMissionDeleteReason').mockReturnValue(missionFollowerEntity);
            jest.spyOn(repository, 'saveMissionDeleteReason').mockResolvedValueOnce(missionFollowerEntity);

            const result = await service.createMissionDeleteReason(missionFollowerEntity);

            expect(repository.createMissionDeleteReason).toHaveBeenCalledWith(missionFollowerEntity);
            expect(repository.saveMissionDeleteReason).toHaveBeenCalled();
            expect(result).toEqual(missionFollowerEntity);
        });
    });
});