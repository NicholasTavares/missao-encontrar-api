import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { MissionModel } from "../mission/mission.model";
import { ObjectMissionEntity } from "src/domain/object-mission/object-mission.entity";
import { ObjectMissionCategoryModel } from "../object-mission-categories/object-mission-categories.model";

@Entity('object_missions')
export class ObjectMissionModel implements ObjectMissionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'object_name' })
    object_name: string;

    @Column()
    description: string;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @OneToOne(() => MissionModel, mission => mission?.mission_details_object)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>;

    @ManyToMany(() => ObjectMissionCategoryModel, category => category.objects_missions)
    @JoinTable({ name: 'object_missions_object_categories', joinColumn: { name: 'object_id' }, inverseJoinColumn: { name: 'category_id' } })
    object_mission_categories: Relation<ObjectMissionCategoryModel>[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
};