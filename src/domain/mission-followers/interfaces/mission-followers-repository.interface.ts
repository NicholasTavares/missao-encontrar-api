import { MissionFollowerEntity } from "../mission-followers.entity";
import { EntityManager } from "typeorm";
import { CreateMissionFollowerDTO } from "src/presentation/mission-followers/mission-followers.dto";

export interface MissionFollowersRepository {
    getAllMissionFollowersByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<MissionFollowerEntity[]>;
    getFollowersCountByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<number>;
    getFollowerByMissionIdAndUserId(mission_id: string, user_id: string, transactionManager?: EntityManager): Promise<MissionFollowerEntity>
    createMissionFollower(createMissionFollower: CreateMissionFollowerDTO): MissionFollowerEntity;
    saveMissionFollower(mission: MissionFollowerEntity, transactionManager?: EntityManager): Promise<MissionFollowerEntity>;
};