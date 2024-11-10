import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RewardsEditionsRepository } from 'src/domain/rewards-editions/interfaces/rewards-editions-repository.interface';
import { RewardsEditionsModel } from './rewards-editions.model';
import { RewardsEditionsEntity } from 'src/domain/rewards-editions/rewards-editions.entity';
import { CreateRewarsEditionsDTO } from 'src/presentation/rewards-editions/rewards-editions.dto';

@Injectable()
export class RewardsEditionsRepositoryImpl implements RewardsEditionsRepository {
    constructor(
        @InjectRepository(RewardsEditionsModel)
        private readonly rewardsEditionsRepository: Repository<RewardsEditionsModel>,
    ) { }

    async getRewardsEditionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<RewardsEditionsEntity[]> {
        return transactionManager ? await transactionManager.find(RewardsEditionsModel, {
            where: { mission_id }
        }) : await this.rewardsEditionsRepository.find({ where: { mission_id } });
    }

    createRewardsEdition(rewardsEditionsEntity: CreateRewarsEditionsDTO): RewardsEditionsEntity {
        const created_rewards_edition = this.rewardsEditionsRepository.create(rewardsEditionsEntity);
        return created_rewards_edition;
    };

    async saveRewardsEdition(rewardsEditionsEntity: RewardsEditionsEntity, transactionManager?: EntityManager): Promise<RewardsEditionsEntity> {
        return transactionManager ? await transactionManager.save(RewardsEditionsModel, rewardsEditionsEntity) : await this.rewardsEditionsRepository.save(rewardsEditionsEntity);
    };
}