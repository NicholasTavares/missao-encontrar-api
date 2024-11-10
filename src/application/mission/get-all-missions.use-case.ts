import { Injectable } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { MissionEntity } from 'src/domain/mission/mission.entity';

@Injectable()
export class GetAllMissionsUseCase {
    constructor(
        private readonly missionService: MissionService
    ) { }

    async execute(): Promise<MissionEntity[]> {
        const missions = await this.missionService.getAllMissions();
        return missions;
    }
}