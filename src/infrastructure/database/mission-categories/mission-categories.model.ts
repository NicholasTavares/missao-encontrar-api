import { MissionCategoryEntity } from 'src/domain/mission-categories/mission-category.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    Relation,
} from 'typeorm';
import { MissionModel } from '../mission/mission.model';

@Entity('mission_categories')
export class MissionCategoryModel implements MissionCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    category: string;

    @Column({ unique: true })
    level: number;

    @Column()
    description: string;

    @ManyToMany(() => MissionModel, mission => mission.categories)
    missions: Relation<MissionModel>[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
}