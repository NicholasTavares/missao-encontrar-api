import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MissionDeleteReasonModel } from './mission-delete-reason.model';
import { MissionDeleteReasonRepository } from 'src/domain/mission-delete-reason/interfaces/mission-delete-reason-repository.interface';
import { MissionDeleteReasonEntity } from 'src/domain/mission-delete-reason/mission-delete-reason.entity';
import { CreateMissionDeleteReasonDTO } from 'src/presentation/mission-delete-reason/mission-delete-reason.dto';

@Injectable()
export class MissionDeleteReasonRepositoryImpl implements MissionDeleteReasonRepository {
    constructor(
        @InjectRepository(MissionDeleteReasonModel)
        private readonly missionDeleteReasonRepository: Repository<MissionDeleteReasonModel>,
    ) { }

    createMissionDeleteReason(createMissionDeleteReasonDTO: CreateMissionDeleteReasonDTO): MissionDeleteReasonEntity {
        const created_mission_delete_reason = this.missionDeleteReasonRepository.create(createMissionDeleteReasonDTO);
        return created_mission_delete_reason;
    };

    async saveMissionDeleteReason(missionDeleteReasonEntity: MissionDeleteReasonEntity, transactionManager?: EntityManager): Promise<MissionDeleteReasonEntity> {
        return transactionManager ? await transactionManager.save(MissionDeleteReasonModel, missionDeleteReasonEntity) : await this.missionDeleteReasonRepository.save(missionDeleteReasonEntity);
    };
}