import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { MissionModel } from "../mission/mission.model";
import { PetMissionEntity } from "src/domain/pet-mission/pet-mission.entity";

@Entity('pet_missions')
export class PetMissionModel implements PetMissionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    color: string;

    @Column()
    sex: string;

    @Column({ name: 'predominant_color' })
    predominant_color: string;

    @Column({ name: 'pet_species' })
    pet_species: string;

    @Column({ name: 'mission_id' })
    mission_id: string;

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