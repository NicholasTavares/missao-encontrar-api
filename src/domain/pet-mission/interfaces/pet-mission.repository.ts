import { EntityManager } from "typeorm";
import { PetMissionEntity } from "../pet-mission.entity";
import { CreatePetMissionDTO } from "src/presentation/pet-mission/pet-mission.dto";

export interface PetMissionRepository {
    getPetMissionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<PetMissionEntity | null>;
    createPetMission(pet_mission: CreatePetMissionDTO): PetMissionEntity;
    savePetMission(pet_mission: PetMissionEntity, transactionManager?: EntityManager): Promise<PetMissionEntity>;
};