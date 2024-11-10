import { Injectable } from "@nestjs/common";
import { RewardsEditionsRepositoryImpl } from "src/infrastructure/database/rewards-editions/rewards-editions.repository";
import { CreateRewarsEditionsDTO } from "src/presentation/rewards-editions/rewards-editions.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class RewardsEditionsService {
    constructor(private readonly rewardsEditionsRepositoryImpl: RewardsEditionsRepositoryImpl) { }

    private convertToCents(current_reward: number): number {
        return Math.round(current_reward * 100);
    };

    async getRewardsEditionByMissionId(mission_id: string, transactionManager?: EntityManager) {
        const rewards_edition = await this.rewardsEditionsRepositoryImpl.getRewardsEditionByMissionId(mission_id, transactionManager);

        return rewards_edition;
    }

    async createRewardsEdition(createRewarsEditionsDTO: CreateRewarsEditionsDTO, transactionManager?: EntityManager) {
        const created_rewards_edition = this.rewardsEditionsRepositoryImpl.createRewardsEdition({
            ...createRewarsEditionsDTO,
            value: this.convertToCents(createRewarsEditionsDTO.value)
        },);

        const saved_rewards_edition = await this.rewardsEditionsRepositoryImpl.saveRewardsEdition({
            ...created_rewards_edition,
            value: this.convertToCents(createRewarsEditionsDTO.value)
        }, transactionManager);

        return saved_rewards_edition;
    };
}