import { MissionFollowersRepositoryImpl } from "src/infrastructure/database/mission-followers/mission-followers.repository";
import { MissionFollowersService } from "./mission-followers.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MissionFollowerEntity } from "./mission-followers.entity";

describe('MissionTimelineService', () => {
    let service: MissionFollowersService;
    let repository: MissionFollowersRepositoryImpl;

    const mission_id = "68ec1990-2b3a-4aa5-8999-6ee3265fa765";

    const missionFollowerEntity: MissionFollowerEntity = {
        id: "9bb42e4a-1fc0-4f08-b8e6-cd8a7313d028",
        mission_id,
        user_id: "4258a194-8f55-41d4-8038-67eb4cdcf3a3",
        followed_at: new Date("2024-11-24T18:46:56.777Z"),
        unfollowed_at: new Date("2024-11-25T11:16:38.162Z")
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MissionFollowersService,
                {
                    provide: MissionFollowersRepositoryImpl,
                    useValue: {
                        getAllMissionFollowersByMissionId: jest.fn(),
                        getFollowersCountByMissionId: jest.fn(),
                        getFollowerByMissionIdAndUserId: jest.fn(),
                        createMissionFollower: jest.fn(),
                        saveMissionFollower: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<MissionFollowersService>(MissionFollowersService);
        repository = module.get<MissionFollowersRepositoryImpl>(MissionFollowersRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getAllMissionFollowersByMissionId', () => {
        it('should return all missions', async () => {
            const missionFollowers = [missionFollowerEntity];
            jest.spyOn(repository, 'getAllMissionFollowersByMissionId').mockResolvedValueOnce(missionFollowers as any);

            const result = await service.getAllMissionFollowersByMissionId(mission_id);

            expect(repository.getAllMissionFollowersByMissionId).toHaveBeenCalled();
            expect(result).toEqual(missionFollowers);
        });
    });

    describe('getFollowersCountByMissionId', () => {
        it('should return count of followers', async () => {
            const count = 1;
            jest.spyOn(repository, 'getFollowersCountByMissionId').mockResolvedValueOnce(count as any);

            const result = await service.getFollowersCountByMissionId(mission_id);

            expect(repository.getFollowersCountByMissionId).toHaveBeenCalled();
            expect(result).toEqual(count);
        });
    });

    describe('getFollowerByMissionIdAndUserId', () => {
        it('should return follower', async () => {
            jest.spyOn(repository, 'getFollowerByMissionIdAndUserId').mockResolvedValueOnce(missionFollowerEntity as any);

            const result = await service.getFollowerByMissionIdAndUserId(mission_id, missionFollowerEntity.user_id);

            expect(repository.getFollowerByMissionIdAndUserId).toHaveBeenCalledWith(mission_id, missionFollowerEntity.user_id, undefined);
            expect(result).toEqual(missionFollowerEntity);
        });
    });

    describe('createMissionFollower', () => {
        it('should create a follower', async () => {
            jest.spyOn(repository, 'createMissionFollower').mockReturnValueOnce(missionFollowerEntity as any);
            jest.spyOn(repository, 'saveMissionFollower').mockResolvedValueOnce(missionFollowerEntity as any);

            const result = await service.createMissionFollower(missionFollowerEntity);

            expect(repository.createMissionFollower).toHaveBeenCalledWith(missionFollowerEntity);
            expect(repository.saveMissionFollower).toHaveBeenCalledWith(missionFollowerEntity, undefined);
            expect(result).toEqual(missionFollowerEntity);
        });
    });

    describe('updateMissionFollower', () => {
        it('should update a follower', async () => {
            jest.spyOn(repository, 'saveMissionFollower').mockResolvedValueOnce(missionFollowerEntity as any);

            const result = await service.updateMissionFollower(missionFollowerEntity);

            expect(repository.saveMissionFollower).toHaveBeenCalledWith(missionFollowerEntity, undefined);
            expect(result).toEqual(missionFollowerEntity);
        });
    });
});