import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { DeleteMissionDTO } from 'src/presentation/mission/mission.dto';
import { UserService } from 'src/domain/user/user.service';
import { EntityManager } from 'typeorm';
import { MissionDeleteReasonService } from 'src/domain/mission-delete-reason/mission-delete-reason.service';

@Injectable()
export class DeleteMissionUseCase {
    private readonly logger = new Logger(DeleteMissionUseCase.name);
    constructor(
        private readonly missionService: MissionService,
        private readonly missionDeleteReasonService: MissionDeleteReasonService,
        private readonly userService: UserService,
        private readonly entityManager: EntityManager
    ) { }

    async execute(deleteMissionDTO: DeleteMissionDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                const missionOwner = await this.userService.getUserById(deleteMissionDTO.user_id, transactionManager);

                const missionToBeDeleted = await this.missionService.getMissionById(deleteMissionDTO.mission_id, transactionManager);

                if (missionOwner.id !== missionToBeDeleted.user_id) {
                    throw new BadRequestException('Usuário não é dono da missão.');
                };

                await this.missionDeleteReasonService.createMissionDeleteReason({
                    mission_id: deleteMissionDTO.mission_id,
                    reason: deleteMissionDTO.reason
                }, transactionManager);

                const isMissionDeleted = await this.missionService.deleteMission(deleteMissionDTO.mission_id, transactionManager);

                this.logger.log(`Missão ${deleteMissionDTO.mission_id} deletada com sucesso: ${isMissionDeleted}`);

                if (!isMissionDeleted) {
                    throw new BadRequestException('Erro ao deletar missão.');
                };

                return { success: isMissionDeleted };
            } catch (error) {
                throw error;
            }
        });
    }
}