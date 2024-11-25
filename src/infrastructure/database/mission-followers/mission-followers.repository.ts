import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MissionFollowersRepository } from "src/domain/mission-followers/interfaces/mission-followers-repository.interface";
import { MissionFollowerModel } from "./mission-followers.model";
import { EntityManager, Repository } from "typeorm";
import { MissionFollowerEntity } from "src/domain/mission-followers/mission-followers.entity";
import { CreateMissionFollowerDTO } from "src/presentation/mission-followers/mission-followers.dto";

@Injectable()
export class MissionFollowersRepositoryImpl implements MissionFollowersRepository {
    constructor(
        @InjectRepository(MissionFollowerModel)
        private readonly missionFollowerRepository: Repository<MissionFollowerModel>,
    ) { }

    async getAllMissionFollowersByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<MissionFollowerEntity[]> {
        const followers = transactionManager ? transactionManager.find(MissionFollowerModel, { where: { mission_id } })
            : this.missionFollowerRepository.find({ where: { mission_id } });
        return followers;
    };

    async getFollowersCountByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<number> {
        const followers_count = transactionManager ? transactionManager.count(MissionFollowerModel, { where: { mission_id } })
            : this.missionFollowerRepository.count({ where: { mission_id } });
        return followers_count;
    };

    async getFollowerByMissionIdAndUserId(mission_id: string, user_id: string, transactionManager?: EntityManager): Promise<MissionFollowerEntity> {
        const followers_count = transactionManager ? transactionManager.findOne(MissionFollowerModel, { where: { mission_id, user_id }, withDeleted: true })
            : this.missionFollowerRepository.findOne({ where: { mission_id, user_id }, withDeleted: true });
        return followers_count;
    };

    createMissionFollower(createMissionFollower: CreateMissionFollowerDTO): MissionFollowerEntity {
        const created_mission_follower = this.missionFollowerRepository.create(createMissionFollower);
        return created_mission_follower;
    };

    async saveMissionFollower(mission: MissionFollowerEntity, transactionManager?: EntityManager): Promise<MissionFollowerEntity> {
        const saved_mission_follower = transactionManager ? await transactionManager.save(MissionFollowerModel, mission)
            : await this.missionFollowerRepository.save(mission);

        return saved_mission_follower;
    };
}