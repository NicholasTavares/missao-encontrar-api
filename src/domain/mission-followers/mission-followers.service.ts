import { Injectable } from "@nestjs/common";
import { MissionFollowersRepositoryImpl } from "src/infrastructure/database/mission-followers/mission-followers.repository";
import { CreateMissionFollowerDTO } from "src/presentation/mission-followers/mission-followers.dto";
import { EntityManager } from "typeorm";
import { MissionFollowerEntity } from "./mission-followers.entity";

@Injectable()
export class MissionFollowersService {
    constructor(private readonly missionFollowersRepositoryImpl: MissionFollowersRepositoryImpl) { }

    async getAllMissionFollowersByMissionId(mission_id: string, transactionManager?: EntityManager) {
        const mission_followers = await this.missionFollowersRepositoryImpl.getAllMissionFollowersByMissionId(mission_id, transactionManager);
        return mission_followers;
    };

    async getFollowersCountByMissionId(mission_id: string, transactionManager?: EntityManager) {
        const followers_count = await this.missionFollowersRepositoryImpl.getFollowersCountByMissionId(mission_id, transactionManager);
        return followers_count;
    };

    async getFollowerByMissionIdAndUserId(mission_id: string, user_id: string, transactionManager?: EntityManager) {
        const mission_follower = await this.missionFollowersRepositoryImpl.getFollowerByMissionIdAndUserId(mission_id, user_id, transactionManager);
        return mission_follower;
    };

    async updateMissionFollower(mission_follower: MissionFollowerEntity, transactionManager?: EntityManager) {
        const updated_mission_follower = await this.missionFollowersRepositoryImpl.saveMissionFollower(mission_follower, transactionManager);
        return updated_mission_follower;
    }

    async createMissionFollower(mission_follower: CreateMissionFollowerDTO, transactionManager?: EntityManager) {
        const created_mission_follower = this.missionFollowersRepositoryImpl.createMissionFollower(mission_follower);

        const saved_mission_follower = await this.missionFollowersRepositoryImpl.saveMissionFollower(created_mission_follower, transactionManager);

        return saved_mission_follower;
    };
};