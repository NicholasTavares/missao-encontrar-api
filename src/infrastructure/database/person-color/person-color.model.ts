import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PersonColorEntity } from "src/domain/person-color/person-color.entity";
import { PersonMissionModel } from "../person-mission/person-mission.model";

@Entity('person_color')
export class PersonColorModel implements PersonColorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    color: string;

    @OneToMany(() => PersonMissionModel, person_color => person_color.person_color)
    person_mission: PersonMissionModel;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
};