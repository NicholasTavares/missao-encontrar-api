import { Injectable } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { MissionEntity } from 'src/domain/mission/mission.entity';
import { UpdateMissionRewardsDTO } from 'src/presentation/mission/mission.dto';
import { EntityManager } from 'typeorm';
import { RewardsEditionsService } from 'src/domain/rewards-editions/rewards-editions.service';

@Injectable()
export class UpdateMissionsRewardsUseCase {
    constructor(
        private readonly missionService: MissionService,
        private readonly rewardsEditionsService: RewardsEditionsService,
        private readonly entityManager: EntityManager
    ) { }

    async execute(UpdateMissionRewardsDTO: UpdateMissionRewardsDTO): Promise<MissionEntity> {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                const mission = await this.missionService.getMissionById(UpdateMissionRewardsDTO.mission_id, transactionManager);

                await this.missionService.updateMissionRewards(UpdateMissionRewardsDTO, mission, transactionManager);

                await this.rewardsEditionsService.createRewardsEdition({
                    mission_id: mission.id,
                    value: UpdateMissionRewardsDTO.reward
                }, transactionManager);

                return mission;
            } catch (error) {
                throw error;
            }
        });
    };
};