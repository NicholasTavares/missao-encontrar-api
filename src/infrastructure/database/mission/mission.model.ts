import { MissionEntity } from 'src/domain/mission/mission.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    JoinColumn,
    OneToOne,
    Relation
} from 'typeorm';
import { MissionCategoryModel } from '../mission-categories/mission-categories.model';
import { RewardsEditionsModel } from '../rewards-editions/rewards-editions.model';
import { UserModel } from '../user/user.model';
import { PersonMissionModel } from '../person-mission/person-mission.model';
import { PetMissionModel } from '../pet-mission/pet-mission.model';

@Entity('missions')
export class MissionModel implements MissionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'mission_details_type' })
    mission_details_type: string;

    @Column({ name: 'initial_reward' })
    initial_reward: number;

    @Column({ name: 'current_reward' })
    current_reward: number;

    @Column({ name: 'lowest_reward', nullable: true })
    lowest_reward?: number;

    @Column({ type: 'decimal' })
    latitude: number;

    @Column({ type: 'decimal' })
    longitude: number;

    @Column({ nullable: true })
    status?: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @ManyToOne(() => UserModel, user => user.missions)
    @JoinColumn({ name: 'user_id' })
    user: Relation<UserModel>

    @OneToMany(() => RewardsEditionsModel, category => category.mission)
    rewards_editions: Relation<RewardsEditionsModel>[];

    @OneToOne(() => PersonMissionModel, mission_details => mission_details.mission)
    mission_details_person?: Relation<PersonMissionModel>;

    @OneToOne(() => PetMissionModel, mission_details => mission_details.mission)
    mission_details_pet?: Relation<PetMissionModel>;

    @ManyToMany(() => MissionCategoryModel, category => category.missions)
    @JoinTable({ name: 'mission_mission_categories', joinColumn: { name: 'mission_id' }, inverseJoinColumn: { name: 'category_id' } })
    categories: Relation<MissionCategoryModel>[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
}