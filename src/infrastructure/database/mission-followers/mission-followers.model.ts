import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Relation,
} from 'typeorm';
import { MissionFollowerEntity } from 'src/domain/mission-followers/mission-followers.entity';
import { MissionModel } from '../mission/mission.model';

@Entity('mission_followers')
export class MissionFollowerModel implements MissionFollowerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @ManyToOne(() => MissionModel, mission => mission.mission_followers)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>

    @CreateDateColumn({ name: 'followed_at', type: 'timestamp' })
    followed_at: Date;

    @DeleteDateColumn({ name: 'unfollowed_at', type: 'timestamp', nullable: true })
    unfollowed_at?: Date;
};