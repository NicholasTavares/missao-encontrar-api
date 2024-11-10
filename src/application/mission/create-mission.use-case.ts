import { Injectable } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { CreateMissionDTO } from 'src/presentation/mission/mission.dto';
import { UserService } from 'src/domain/user/user.service';
import { MissionCategoryService } from 'src/domain/mission-categories/mission-categories.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateMissionUseCase {
    constructor(
        private readonly missionService: MissionService,
        private readonly userService: UserService,
        private readonly missionCategoryService: MissionCategoryService,
        private readonly entityManager: EntityManager
    ) { }

    // TODO: pensar em como fica o status da missão ao criar
    async execute(createMissionDTO: CreateMissionDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                // Retrieve user within transaction
                await this.userService.getUserById(createMissionDTO.user_id, transactionManager);

                // Retrieve mission category within transaction
                const category = await this.missionCategoryService.getMissionCategoryById(createMissionDTO.category_id, transactionManager);

                // Create mission within transaction
                const mission = await this.missionService.createMission(createMissionDTO, category, transactionManager);

                return mission;
            } catch (error) {
                throw error;
            }
        });
    }
}