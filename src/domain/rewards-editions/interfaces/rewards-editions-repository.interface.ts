import { CreateRewarsEditionsDTO } from "src/presentation/rewards-editions/rewards-editions.dto";
import { RewardsEditionsEntity } from "../rewards-editions.entity";
import { EntityManager } from "typeorm";

export interface RewardsEditionsRepository {
    getRewardsEditionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<RewardsEditionsEntity[]>
    createRewardsEdition(rewardsEditionsEntity: CreateRewarsEditionsDTO): RewardsEditionsEntity;
    saveRewardsEdition(rewardsEditionsEntity: RewardsEditionsEntity): Promise<RewardsEditionsEntity>;
};