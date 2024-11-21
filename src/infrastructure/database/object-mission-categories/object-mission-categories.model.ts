import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { ObjectMissionCategoryEntity } from "src/domain/object-mission-categories/object-mission-categories.entity";
import { ObjectMissionModel } from "../object-mission/object-mission.model";

@Entity('object_categories')
export class ObjectMissionCategoryModel implements ObjectMissionCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category: string;

    @Column()
    description: string;

    @ManyToMany(() => ObjectMissionModel, mission => mission.object_mission_categories)
    objects_missions: Relation<ObjectMissionModel>[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
};