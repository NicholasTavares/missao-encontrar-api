import { BadRequestException, Injectable } from "@nestjs/common";
import { MissionFollowersService } from "src/domain/mission-followers/mission-followers.service";
import { MissionService } from "src/domain/mission/mission.service";
import { UserService } from "src/domain/user/user.service";
import { CreateMissionFollowerDTO } from "src/presentation/mission-followers/mission-followers.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class HandleMissionFollowerUseCase {
    constructor(
        private readonly missionFollowersService: MissionFollowersService,
        private readonly userService: UserService,
        private readonly missionService: MissionService,
        private readonly entityManager: EntityManager
    ) { }

    // REMENBER: acho que no futuro precisa pensar se seguir e não seguir precisa de um limitador de requests para evitar DDOS
    async execute(createMissionFollowerDTO: CreateMissionFollowerDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                const user = await this.userService.getUserById(createMissionFollowerDTO.user_id, transactionManager);

                const mission = await this.missionService.getMissionById(createMissionFollowerDTO.mission_id, transactionManager);

                if (mission.user_id === user.id) {
                    throw new BadRequestException("Usuário não pode seguir a própria missão");
                };

                let mission_follower = await this.missionFollowersService.getFollowerByMissionIdAndUserId(createMissionFollowerDTO.mission_id, createMissionFollowerDTO.user_id, transactionManager);

                if (mission_follower) {
                    if (mission_follower.unfollowed_at) {
                        mission_follower.unfollowed_at = null;
                        //TODO: ver no futuro o fuso horário correto
                        mission_follower.followed_at = new Date();
                    } else {
                        mission_follower.unfollowed_at = new Date();
                    }
                    await this.missionFollowersService.updateMissionFollower(mission_follower, transactionManager);
                } else {
                    mission_follower = await this.missionFollowersService.createMissionFollower(createMissionFollowerDTO, transactionManager);
                }

                return mission_follower;
            } catch (error) {
                throw error;
            };
        });
    };
};