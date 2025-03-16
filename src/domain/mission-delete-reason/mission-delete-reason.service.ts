import { BadRequestException, Injectable } from "@nestjs/common";
import { MissionDeleteReasonRepositoryImpl } from "src/infrastructure/database/mission-delete-reason/mission-delete-reason.repository";
import { CreateMissionDeleteReasonDTO } from "src/presentation/mission-delete-reason/mission-delete-reason.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class MissionDeleteReasonService {
    private readonly MIN_REASON_LENGTH = 5;
    constructor(private readonly missionDeleteReasonRepositoryImpl: MissionDeleteReasonRepositoryImpl) { }

    async createMissionDeleteReason(createMissionDeleteReasonDTO: CreateMissionDeleteReasonDTO, transactionManager?: EntityManager) {
        if (createMissionDeleteReasonDTO.reason.length < this.MIN_REASON_LENGTH) {
            throw new BadRequestException(`Razão deve ter no mínimo ${this.MIN_REASON_LENGTH} caracteres.`);
        };

        const created_mission_follower = this.missionDeleteReasonRepositoryImpl.createMissionDeleteReason(createMissionDeleteReasonDTO);

        const saved_mission_follower = await this.missionDeleteReasonRepositoryImpl.saveMissionDeleteReason(created_mission_follower, transactionManager);

        return saved_mission_follower;
    };
};