import { Injectable } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { MissionDTO } from 'src/presentation/mission/mission.dto';
import { UserService } from 'src/domain/user/user.service';
import { MissionCategoryService } from 'src/domain/mission-categories/mission-categories.service';
import { EntityManager } from 'typeorm';
import { PersonMissionService } from 'src/domain/person-mission/person-mission.service';
import { PersonColorService } from 'src/domain/person-color/person-color.service';

@Injectable()
export class CreateMissionUseCase {
    constructor(
        private readonly missionService: MissionService,
        private readonly userService: UserService,
        private readonly missionCategoryService: MissionCategoryService,
        private readonly personMissionService: PersonMissionService,
        private readonly personColorService: PersonColorService,
        private readonly entityManager: EntityManager
    ) { }

    // TODO: pensar em como fica o status da missão ao criar
    // TODO: colocar condicionais de detalhamento para cada tipo de missão
    // TODO: repensar tabelas de colunas de categorias ao ivés de tabelas de categorias
    // TODO: incluir sexo da pessoa
    async execute(missionDTO: MissionDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                await this.userService.getUserById(missionDTO.mission.user_id, transactionManager);

                const category = await this.missionCategoryService.getMissionCategoryById(missionDTO.mission.category_id, transactionManager);

                const mission = await this.missionService.createMission(missionDTO.mission, category, transactionManager);

                await this.personColorService.getPersonColorById(missionDTO.mission_details.color_id, transactionManager);

                await this.personMissionService.createPersonMission(missionDTO.mission_details, mission.id, transactionManager);

                return mission;
            } catch (error) {
                throw error;
            }
        });
    }
}