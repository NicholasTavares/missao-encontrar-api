import { PersonMissionEntity } from "src/domain/person-mission/person-mission.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MissionModel } from "../mission/mission.model";
import { PersonColorModel } from "../person-color/person-color.model";

@Entity('person_missions')
export class PersonMissionModel implements PersonMissionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    hair: string;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @Column({ name: 'color_id' })
    color_id: string;

    @OneToOne(() => MissionModel, mission => mission?.mission_details_person)
    @JoinColumn({ name: 'mission_id' })
    mission: MissionModel;

    @ManyToOne(() => PersonColorModel, person_color => person_color.person_mission)
    @JoinColumn({ name: 'color_id' })
    person_color: PersonColorModel;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
};