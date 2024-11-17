import { BadRequestException, Injectable } from "@nestjs/common";
import { PetMissionRepositoryImpl } from "src/infrastructure/database/pet-mission/pet-mission.repository";
import { CreatePetMissionDTO } from "src/presentation/pet-mission/pet-mission.dto";
import { EntityManager } from "typeorm";
import { PetSex } from "./interfaces/pet-mission.enum";

@Injectable()
export class PetMissionService {
    private readonly MIN_NAME_PET_LENGTH = 3;
    private readonly MIN_PREDOMINANT_COLOR_LENGTH = 3;
    constructor(private readonly petMissionRepositoryImpl: PetMissionRepositoryImpl) { }

    async getPetMissionByMissionId(mission_id: string) {
        const pet_mission = await this.petMissionRepositoryImpl.getPetMissionByMissionId(mission_id);

        if (!pet_mission) {
            throw new BadRequestException(`Missão com id ${mission_id} não encontrada.`);
        };

        return pet_mission;
    }

    async createPetMission(createPetMissionDTO: CreatePetMissionDTO, mission_id: string, transactionManager?: EntityManager) {
        if (createPetMissionDTO.name.length < this.MIN_NAME_PET_LENGTH) {
            throw new BadRequestException(`Nome deve ter no mínimo ${this.MIN_NAME_PET_LENGTH} caracteres.`);
        };

        if (createPetMissionDTO.predominant_color.length < this.MIN_PREDOMINANT_COLOR_LENGTH) {
            throw new BadRequestException(`Cor deve ter no mínimo ${this.MIN_PREDOMINANT_COLOR_LENGTH} caracteres.`);
        };

        createPetMissionDTO.sex = createPetMissionDTO.sex.toUpperCase();

        if (!Object.values(PetSex).includes(createPetMissionDTO.sex as PetSex)) {
            throw new BadRequestException(`Sexo inválido: ${createPetMissionDTO.sex}.`);
        };

        const created_person_mission = this.petMissionRepositoryImpl.createPetMission(createPetMissionDTO);
        const saved_person_mission = await this.petMissionRepositoryImpl.savePetMission({
            ...created_person_mission,
            mission_id
        }, transactionManager);

        return saved_person_mission;
    };
}