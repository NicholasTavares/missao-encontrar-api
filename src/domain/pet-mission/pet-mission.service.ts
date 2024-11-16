import { BadRequestException, Injectable } from "@nestjs/common";
import { PetMissionRepositoryImpl } from "src/infrastructure/database/pet-mission/pet-mission.repository";
import { CreatePetMissionDTO } from "src/presentation/pet-mission/pet-mission.dto";
import { EntityManager } from "typeorm";

@Injectable()
export class PetMissionService {
    private readonly MIN_NAME_PET_LENGTH = 3;
    private readonly MIN_PREDOMINANT_COLOR_LENGTH = 3;
    constructor(private readonly petMissionRepositoryImpl: PetMissionRepositoryImpl) { }

    async createPetMission(createPetMissionDTO: CreatePetMissionDTO, mission_id: string, transactionManager?: EntityManager) {
        if (createPetMissionDTO.name.length < this.MIN_NAME_PET_LENGTH) {
            throw new BadRequestException(`Nome deve ter no mínimo ${this.MIN_NAME_PET_LENGTH} caracteres.`);
        };

        if (createPetMissionDTO.predominant_color.length < this.MIN_PREDOMINANT_COLOR_LENGTH) {
            throw new BadRequestException(`Cor deve ter no mínimo ${this.MIN_PREDOMINANT_COLOR_LENGTH} caracteres.`);
        };

        const created_person_mission = this.petMissionRepositoryImpl.createPetMission(createPetMissionDTO);
        const saved_person_mission = await this.petMissionRepositoryImpl.savePetMission({
            ...created_person_mission,
            mission_id
        }, transactionManager);

        return saved_person_mission;
    };
}