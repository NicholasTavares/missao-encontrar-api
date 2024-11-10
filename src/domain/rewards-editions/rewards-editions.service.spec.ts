import { RewardsEditionsRepositoryImpl } from "src/infrastructure/database/rewards-editions/rewards-editions.repository";
import { RewardsEditionsService } from "./rewards-editions.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateRewarsEditionsDTO } from "src/presentation/rewards-editions/rewards-editions.dto";

describe('RewardsEditionsService', () => {
    let service: RewardsEditionsService;
    let repository: RewardsEditionsRepositoryImpl;

    const mission_id = '3e984c39-421e-4550-bc14-52ea36de9ad8';

    const validRewardsEditionDTO: CreateRewarsEditionsDTO = {
        mission_id,
        value: 1000,
    };

    const validRewardsEditionsArray = [
        {
            id: '9ed12e24-6829-4054-b755-6e510f72f518',
            value: 9500,
            mission_id: 'ca346f67-a5df-4b77-81da-0e53e3f9934c',
            edited_at: new Date("2024-11-10T15:44:07.191Z"),
            deleted_at: null
        },
        {
            id: '81fbc5af-1dd1-46c7-88db-099acd9183db',
            value: 9800,
            mission_id: 'ca346f67-a5df-4b77-81da-0e53e3f9934c',
            edited_at: new Date("2024-11-10T15:45:08.303Z"),
            deleted_at: null
        },
        {
            id: 'd10460f4-220b-40a7-a18c-9439265c0c3d',
            value: 10300,
            mission_id: 'ca346f67-a5df-4b77-81da-0e53e3f9934c',
            edited_at: new Date("2024-11-10T15:45:12.267Z"),
            deleted_at: null
        }
    ]


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RewardsEditionsService,
                {
                    provide: RewardsEditionsRepositoryImpl,
                    useValue: {
                        createRewardsEdition: jest.fn(),
                        saveRewardsEdition: jest.fn(),
                        getRewardsEditionByMissionId: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<RewardsEditionsService>(RewardsEditionsService);
        repository = module.get<RewardsEditionsRepositoryImpl>(RewardsEditionsRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe(('convertToCents'), () => {
        it('should convert a number to cents', () => {
            const result = service['convertToCents'](10);
            expect(result).toBe(1000);
        });
    });

    describe('createRewardsEdition', () => {
        it('should call createRewardsEdition and saveRewardsEdition', async () => {
            const dto = { ...validRewardsEditionDTO };

            await service.createRewardsEdition(validRewardsEditionDTO);

            expect(repository.createRewardsEdition).toHaveBeenCalledWith({
                ...dto,
                value: dto.value * 100,
            });
            expect(repository.saveRewardsEdition).toHaveBeenCalled();
        });
    });

    describe('getRewardsEditionByMissionId', () => {
        it('should return an array of rewards editions by mission id', async () => {
            jest.spyOn(repository, 'getRewardsEditionByMissionId').mockResolvedValueOnce(validRewardsEditionsArray);

            const result = await service.getRewardsEditionByMissionId(mission_id);

            expect(repository.getRewardsEditionByMissionId).toHaveBeenCalledWith(mission_id, undefined);
            expect(result).toEqual(validRewardsEditionsArray);
        });
    });

});