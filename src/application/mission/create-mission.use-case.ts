import { BadRequestException, Injectable } from '@nestjs/common';
import { MissionService } from '../../domain/mission/mission.service';
import { MissionDTO } from 'src/presentation/mission/mission.dto';
import { UserService } from 'src/domain/user/user.service';
import { MissionCategoryService } from 'src/domain/mission-categories/mission-categories.service';
import { EntityManager } from 'typeorm';
import { PersonMissionService } from 'src/domain/person-mission/person-mission.service';
import { MissionDetailsType } from 'src/domain/mission/interfaces/mission-details-type.enum';
import { PetMissionService } from 'src/domain/pet-mission/pet-mission.service';
import { ObjectMissionService } from 'src/domain/object-mission/object-mission.service';
import { ObjectMissionCategoriesService } from 'src/domain/object-mission-categories/object-mission-categories.service';

@Injectable()
export class CreateMissionUseCase {
    constructor(
        private readonly missionService: MissionService,
        private readonly userService: UserService,
        private readonly missionCategoryService: MissionCategoryService,
        private readonly personMissionService: PersonMissionService,
        private readonly petMissionService: PetMissionService,
        private readonly objectMissionService: ObjectMissionService,
        private readonly objectMissionCategoriesService: ObjectMissionCategoriesService,
        private readonly entityManager: EntityManager
    ) { }

    // TODO: pensar em como fica o status da missão ao criar
    async execute(missionDTO: MissionDTO) {
        return await this.entityManager.transaction(async (transactionManager) => {
            try {
                await this.userService.getUserById(missionDTO.mission.user_id, transactionManager);

                const category = await this.missionCategoryService.getMissionCategoryById(missionDTO.mission.category_id, transactionManager);

                //REMENBER: cadastrar na tabela de categorias os valores iguais a mission_details_type
                if (category.category.toUpperCase() !== missionDTO.mission.mission_details_type.toUpperCase()) {
                    throw new BadRequestException('Categoria inválida.');
                };

                const mission = await this.missionService.createMission(missionDTO.mission, category, transactionManager);

                switch (mission.mission_details_type) {
                    case MissionDetailsType.PERSON:
                        await this.personMissionService.createPersonMission(missionDTO.mission_details_person, mission.id, transactionManager);
                        break;
                    case MissionDetailsType.PET:
                        await this.petMissionService.createPetMission(missionDTO.mission_details_pet, mission.id, transactionManager);
                        break;
                    case MissionDetailsType.OBJECT:
                        const object_category = await this.objectMissionCategoriesService.getMissionCategoryById(missionDTO.mission_details_object.object_category_id, transactionManager);

                        await this.objectMissionService.createObjectMission(missionDTO.mission_details_object, mission.id, object_category, transactionManager);
                        break;
                    default:
                        break;
                };

                return mission;
            } catch (error) {
                throw error;
            }
        });
    }
}