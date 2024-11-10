import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MissionRepositoryImpl } from 'src/infrastructure/database/mission/mission.repository';
import { CreateMissionDTO, UpdateMissionDTO, UpdateMissionRewardsDTO } from 'src/presentation/mission/mission.dto';
import { MissionCategoryEntity } from '../mission-categories/mission-category.entity';
import { EntityManager } from 'typeorm';
import { MissionEntity } from './mission.entity';

@Injectable()
export class MissionService {
    private readonly MIN_TITLE_LENGTH = 3;
    private readonly MIN_DESCRIPTION_LENGTH = 10;
    private readonly MIN_REWARD_REAIS = 5;
    private readonly MIN_REWARD_UPDATE_REAIS = 3;
    constructor(private readonly missionRepository: MissionRepositoryImpl) { }

    async getAllMissions() {
        const missions = await this.missionRepository.getAllMissions();
        return missions;
    }

    async getMissionById(mission_id: string, entityManager?: EntityManager) {
        const mission = await this.missionRepository.getMissionById(mission_id, entityManager);

        if (!mission) {
            throw new NotFoundException(`Missão com id ${mission_id} não encontrada.`);
        };

        return mission;
    }

    private convertToCents(current_reward: number): number {
        return Math.round(current_reward * 100);
    };

    async createMission(createMissionDTO: CreateMissionDTO, category: MissionCategoryEntity, entityManager?: EntityManager) {
        if (createMissionDTO.title.length < this.MIN_TITLE_LENGTH) {
            throw new BadRequestException(`O título da missão deve ter no mínimo ${this.MIN_TITLE_LENGTH} caracteres.`);
        }

        if (createMissionDTO.description.length < this.MIN_DESCRIPTION_LENGTH) {
            throw new BadRequestException(`A descrição da missão deve ter no mínimo ${this.MIN_DESCRIPTION_LENGTH} caracteres.`);
        }

        const rewardInCents = this.convertToCents(createMissionDTO.current_reward);
        const minRewardInCents = this.convertToCents(this.MIN_REWARD_REAIS);

        if (rewardInCents < minRewardInCents) {
            throw new BadRequestException(`A recompensa da missão deve ser no mínimo ${this.MIN_REWARD_REAIS} reais.`);
        };

        if ((createMissionDTO?.latitude && !createMissionDTO?.longitude) || (!createMissionDTO?.latitude && createMissionDTO?.longitude)) {
            throw new BadRequestException('Coordenada inválida.');
        };

        if (createMissionDTO.latitude < -90 || createMissionDTO.latitude > 90) {
            throw new BadRequestException('Latitude inválida.');
        };

        if (createMissionDTO.longitude < -180 || createMissionDTO.longitude > 180) {
            throw new BadRequestException('Longitude inválida.');
        };

        const created_mission = this.missionRepository.createMission({
            ...createMissionDTO,
            current_reward: rewardInCents
        });

        const saved_mission = await this.missionRepository.saveOnCreateMission({
            ...created_mission,
            initial_reward: rewardInCents,
        }, category, entityManager);

        return saved_mission;
    };

    async updateMission(updateMissionDTO: UpdateMissionDTO, mission: MissionEntity, entityManager?: EntityManager) {
        if (updateMissionDTO?.title) {
            if (updateMissionDTO.title.length < this.MIN_TITLE_LENGTH) {
                throw new BadRequestException(`O título da missão deve ter no mínimo ${this.MIN_TITLE_LENGTH} caracteres.`);
            };
        };

        if (updateMissionDTO?.description) {
            if (updateMissionDTO.description.length < this.MIN_DESCRIPTION_LENGTH) {
                throw new BadRequestException(`A descrição da missão deve ter no mínimo ${this.MIN_DESCRIPTION_LENGTH} caracteres.`);
            };
        };

        if ((updateMissionDTO?.latitude && !updateMissionDTO?.longitude) || (!updateMissionDTO?.latitude && updateMissionDTO?.longitude)) {
            throw new BadRequestException('Coordenada inválida.');
        };

        if (updateMissionDTO?.latitude) {
            if (updateMissionDTO.latitude < -90 || updateMissionDTO.latitude > 90) {
                throw new BadRequestException('Latitude inválida.');
            };
        };

        if (updateMissionDTO?.longitude) {
            if (updateMissionDTO.longitude < -180 || updateMissionDTO.longitude > 180) {
                throw new BadRequestException('Longitude inválida.');
            };
        };

        mission.title = updateMissionDTO?.title ?? mission.title;
        mission.description = updateMissionDTO?.description ?? mission.description;
        mission.latitude = updateMissionDTO?.latitude ?? mission.latitude;
        mission.longitude = updateMissionDTO?.longitude ?? mission.longitude;

        const saved_mission = await this.missionRepository.saveMission(mission, entityManager);

        return saved_mission;
    };

    async updateMissionRewards(updateMissionRewardsDTO: UpdateMissionRewardsDTO, mission: MissionEntity, entityManager?: EntityManager) {
        const new_reward_candidate_in_cents = this.convertToCents(updateMissionRewardsDTO.reward);

        if (new_reward_candidate_in_cents <= mission.current_reward) {
            throw new BadRequestException(`A recompensa da missão não pode ser diminuída.`);
        };

        if (new_reward_candidate_in_cents < (mission.current_reward + this.convertToCents(this.MIN_REWARD_UPDATE_REAIS))) {
            throw new BadRequestException(`Novo valor da recompensa deve ser no mínimo ${this.MIN_REWARD_UPDATE_REAIS} reais maior que o valor atual.`);
        }

        mission.lowest_reward = mission.initial_reward;
        mission.current_reward = new_reward_candidate_in_cents;

        const saved_mission = await this.missionRepository.saveMission(mission, entityManager);

        return saved_mission;
    };
}