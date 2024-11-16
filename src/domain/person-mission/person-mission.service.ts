import { BadRequestException, Injectable } from "@nestjs/common";
import { PersonMissionRepositoryImpl } from "src/infrastructure/database/person-mission/person-mission.repository";
import { CreatePersonMissionDTO } from "src/presentation/person-mission/person-mission.dto";
import { EntityManager } from "typeorm";
import { PersonColor } from "./interfaces/person-color.enum";

@Injectable()
export class PersonMissionService {
    private readonly MIN_NAME_PERSON_LENGTH = 3;
    constructor(private readonly personMissionRepository: PersonMissionRepositoryImpl) { }

    // TODO: criar getPersonMissionByMissionId

    async createPersonMission(createPersonMissionDTO: CreatePersonMissionDTO, mission_id: string, transactionManager?: EntityManager) {
        if (createPersonMissionDTO.name.length < this.MIN_NAME_PERSON_LENGTH) {
            throw new BadRequestException(`Nome deve ter no mínimo ${this.MIN_NAME_PERSON_LENGTH} caracteres.`);
        };

        createPersonMissionDTO.color = createPersonMissionDTO.color.toUpperCase();

        if (!Object.values(PersonColor).includes(createPersonMissionDTO.color as PersonColor)) {
            throw new BadRequestException(`Cor inválida: ${createPersonMissionDTO.color}.`);
        };

        const created_person_mission = this.personMissionRepository.createPersonMission(createPersonMissionDTO);
        const saved_person_mission = await this.personMissionRepository.savePersonMission({
            ...created_person_mission,
            mission_id
        }, transactionManager);

        return saved_person_mission;
    };
}