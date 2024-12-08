import { BadRequestException, Injectable } from "@nestjs/common";
import { MissionTimelineRepositoryImpl } from "src/infrastructure/database/mission-timeline/mission-timeline.repository";
import { CreateMissionTimelineDTO, UpdateMissionTimelineDTO } from "src/presentation/mission-timeline/mission-timeline.dto";
import { EntityManager } from "typeorm";
import { UpdateType } from "./interfaces/update-type.enum";
import { VisibilityTimeline } from "./interfaces/visibility-timeline.enum";
import { MissionTimelineEntity } from "./mission-timeline.entity";

@Injectable()
export class MissionTimelineService {
    private readonly MIN_TIMELINE_TITLE_LENGHT = 2;
    private readonly MIN_TIMELINE_DESCRIPTION_LENGHT = 5;
    constructor(private readonly missionTimelineRepositoryImpl: MissionTimelineRepositoryImpl) { }

    async getMissionTimelineById(mission_timeline_id: string) {
        const mission_timeline = await this.missionTimelineRepositoryImpl.getMissionTimelineById(mission_timeline_id);

        return mission_timeline;
    };

    async getMissionTimelineByMissionId(mission_id: string) {
        const mission_timeline = await this.missionTimelineRepositoryImpl.getAllMissionsTimelineByMissionId(mission_id);

        return mission_timeline;
    };

    async createMissionTimeline(createMissionTimelineDTO: CreateMissionTimelineDTO, transactionManager?: EntityManager) {
        if (createMissionTimelineDTO.title.length < this.MIN_TIMELINE_TITLE_LENGHT) {
            throw new BadRequestException(`Título deve ter no mínimo ${this.MIN_TIMELINE_TITLE_LENGHT} caracteres.`);
        };

        if (createMissionTimelineDTO.description.length < this.MIN_TIMELINE_DESCRIPTION_LENGHT) {
            throw new BadRequestException(`Descrição deve ter no mínimo ${this.MIN_TIMELINE_DESCRIPTION_LENGHT} caracteres.`);
        };

        if (!Object.values(UpdateType).includes(createMissionTimelineDTO.update_type.toLocaleUpperCase() as UpdateType)) {
            throw new BadRequestException(`Tipo inválido de timeline: ${createMissionTimelineDTO.update_type}.`);
        };

        if (!Object.values(VisibilityTimeline).includes(createMissionTimelineDTO.visibility.toLocaleUpperCase() as VisibilityTimeline)) {
            throw new BadRequestException(`Tipo inválido de visibilidade timeline: ${createMissionTimelineDTO.visibility}.`);
        };

        const mission_timeline = this.missionTimelineRepositoryImpl.createMissionTimeline(createMissionTimelineDTO);

        const saved_mission_timeline = await this.missionTimelineRepositoryImpl.saveMissionTimeline(mission_timeline, transactionManager);

        return saved_mission_timeline;
    };

    async updateMissionTimeline(mission_timeline: MissionTimelineEntity, updateMissionTimeline: UpdateMissionTimelineDTO, transactionManager?: EntityManager) {
        if (updateMissionTimeline.title && updateMissionTimeline.title.length < this.MIN_TIMELINE_TITLE_LENGHT) {
            throw new BadRequestException(`Título deve ter no mínimo ${this.MIN_TIMELINE_TITLE_LENGHT} caracteres.`);
        };

        if (updateMissionTimeline.description && updateMissionTimeline.description.length < this.MIN_TIMELINE_DESCRIPTION_LENGHT) {
            throw new BadRequestException(`Descrição deve ter no mínimo ${this.MIN_TIMELINE_DESCRIPTION_LENGHT} caracteres.`);
        };

        if (updateMissionTimeline.update_type && !Object.values(UpdateType).includes(updateMissionTimeline.update_type.toUpperCase() as UpdateType)) {
            throw new BadRequestException(`Tipo inválido de timeline: ${updateMissionTimeline.update_type}.`);
        };

        if (updateMissionTimeline.visibility && !Object.values(VisibilityTimeline).includes(updateMissionTimeline.visibility.toUpperCase() as VisibilityTimeline)) {
            throw new BadRequestException(`Tipo inválido de visibilidade timeline: ${updateMissionTimeline.visibility}.`);
        };

        const updated_mission_timeline = { ...mission_timeline, ...updateMissionTimeline };

        const saved_mission_timeline = await this.missionTimelineRepositoryImpl.saveMissionTimeline(updated_mission_timeline, transactionManager);

        return saved_mission_timeline;
    }
};