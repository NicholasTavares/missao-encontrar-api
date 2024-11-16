import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { PetMissionModel } from "./pet-mission.model";
import { PetMissionEntity } from "src/domain/pet-mission/pet-mission.entity";
import { PetMissionRepository } from "src/domain/pet-mission/interfaces/pet-mission.repository";
import { CreatePetMissionDTO } from "src/presentation/pet-mission/pet-mission.dto";

@Injectable()
export class PetMissionRepositoryImpl implements PetMissionRepository {
    constructor(
        @InjectRepository(PetMissionModel)
        private readonly petRepository: Repository<PetMissionModel>,
    ) { }

    async getPetMissionByMissionId(mission_id: string, transactionManager?: EntityManager): Promise<PetMissionEntity | null> {
        return transactionManager ? await transactionManager.findOne(PetMissionModel, { where: { mission_id } }) : await this.petRepository.findOne({ where: { mission_id } });
    };

    createPetMission(pet_mission: CreatePetMissionDTO): PetMissionEntity {
        const created_pet_mission = this.petRepository.create(pet_mission);
        return created_pet_mission;
    };

    async savePetMission(pet_mission: PetMissionEntity, transactionManager?: EntityManager): Promise<PetMissionEntity> {
        return transactionManager ? await transactionManager.save(PetMissionModel, pet_mission) : await this.petRepository.save(pet_mission);
    };
}