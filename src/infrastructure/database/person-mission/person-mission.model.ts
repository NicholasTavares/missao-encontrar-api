import { PersonMissionEntity } from "src/domain/person-mission/person-mission.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { MissionModel } from "../mission/mission.model";

@Entity('person_missions')
export class PersonMissionModel implements PersonMissionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    hair: string;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @Column({ name: 'color' })
    color: string;

    @OneToOne(() => MissionModel, mission => mission?.mission_details_person)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
};