import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ObjectMissionRepositoryImpl } from "src/infrastructure/database/object-mission/object-mission.repository";
import { CreateObjectMissionDTO } from "src/presentation/object-mission/object-mission.dto";
import { EntityManager } from "typeorm";
import { ObjectMissionCategoryEntity } from "../object-mission-categories/object-mission-categories.entity";

@Injectable()
export class ObjectMissionService {
    private readonly MIN_OBJECT_NAME_LENGTH = 3;
    private readonly MIN_OBJECT_DESCRIPTION_LENGTH = 6;
    constructor(private readonly personMissionRepository: ObjectMissionRepositoryImpl) { }

    async getObjectMissionByMissionId(mission_id: string) {
        const object_mission = await this.personMissionRepository.getObjectMissionByMissionId(mission_id);

        if (!object_mission) {
            throw new NotFoundException(`Objeto de missão ${mission_id} não encontrado.`);
        };

        return object_mission;
    }

    async createObjectMission(createObjectMissionDTO: CreateObjectMissionDTO, mission_id: string, category: ObjectMissionCategoryEntity, transactionManager?: EntityManager) {
        if (createObjectMissionDTO.object_name.length < this.MIN_OBJECT_NAME_LENGTH) {
            throw new BadRequestException(`Nome do objeto deve ter no mínimo ${this.MIN_OBJECT_NAME_LENGTH} caracteres.`);
        };

        if (createObjectMissionDTO.description.length < this.MIN_OBJECT_DESCRIPTION_LENGTH) {
            throw new BadRequestException(`Descrição do objeto deve ter no mínimo ${this.MIN_OBJECT_DESCRIPTION_LENGTH} caracteres.`);
        };

        const created_object_mission = this.personMissionRepository.createObjectMission(createObjectMissionDTO);

        const saved_object_mission = await this.personMissionRepository.saveObjectMission({
            ...created_object_mission,
            mission_id
        }, category, transactionManager);

        return saved_object_mission;
    };
}