import { UserEntity } from 'src/domain/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    Relation,
} from 'typeorm';
import { MissionModel } from '../mission/mission.model';
import { MissionTimelineModel } from '../mission-timeline/mission-timeline.model';
import { MissionViewerModel } from '../mission-viewers/mission-viewer.model';

@Entity('users')
export class UserModel implements UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name' })
    first_name: string;

    @Column({ name: 'last_name' })
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    password: string;

    @OneToMany(() => MissionModel, mission => mission.user)
    missions: Relation<MissionModel>[];

    @OneToMany(() => MissionTimelineModel, mission_timeline => mission_timeline.user)
    missions_timeline: Relation<MissionTimelineModel>[];

    @OneToMany(() => MissionViewerModel, mission_viewer_model => mission_viewer_model.user)
    missions_views: Relation<MissionViewerModel>[];

    @Column({ name: 'birth_date', type: 'timestamp' })
    birth_date: Date;

    @Column()
    gender: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
};