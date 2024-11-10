import { Injectable } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { MissionEntity } from 'src/domain/mission/mission.entity';
import { UpdateMissionDTO } from 'src/presentation/mission/mission.dto';

@Injectable()
export class UpdateMissionsUseCase {
    constructor(
        private readonly missionService: MissionService
    ) { }

    async execute(updateMissionDTO: UpdateMissionDTO): Promise<MissionEntity> {
        const mission = await this.missionService.getMissionById(updateMissionDTO.mission_id);

        const updated_mission = await this.missionService.updateMission(updateMissionDTO, mission);
        return updated_mission;
    }
}