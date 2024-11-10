import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MissionRepository } from 'src/domain/mission/interfaces/mission-repository.interface';
import { MissionEntity } from 'src/domain/mission/mission.entity';
import { EntityManager, Repository } from 'typeorm';
import { MissionModel } from './mission.model';
import { CreateMissionDTO } from 'src/presentation/mission/mission.dto';
import { MissionCategoryEntity } from 'src/domain/mission-categories/mission-category.entity';

@Injectable()
export class MissionRepositoryImpl implements MissionRepository {
    constructor(
        @InjectRepository(MissionModel)
        private readonly missionRepository: Repository<MissionModel>,
    ) { }


    // TODO: depois diferenciar um métodos para trazer mais detalhes da missão em busca por id
    async getMissionById(mission_id: string, transactionManager?: EntityManager): Promise<MissionEntity | null> {
        return transactionManager
            ? transactionManager.findOne(MissionModel, { where: { id: mission_id } })
            : this.missionRepository.findOne({ where: { id: mission_id } });
    }

    async getAllMissions(): Promise<MissionEntity[]> {
        const missions = await this.missionRepository.find();
        return missions;
    }

    // TODO: refatorar para retornar por inferência e não a entidade
    createMission(mission: CreateMissionDTO): MissionEntity {
        const created_mission = this.missionRepository.create(mission);
        return created_mission;
    }

    async saveOnCreateMission(mission: MissionEntity, category: MissionCategoryEntity, transactionManager?: EntityManager) {
        return transactionManager ? await transactionManager.save(MissionModel, {
            ...mission,
            categories: [category]
        }) : await this.missionRepository.save({
            ...mission,
            categories: [category]
        });
    }

    async saveMission(mission: MissionEntity, transactionManager?: EntityManager) {
        return transactionManager ? await transactionManager.save(MissionModel, mission) : await this.missionRepository.save(mission);
    }
}