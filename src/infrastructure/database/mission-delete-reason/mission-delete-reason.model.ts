import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
    Relation
} from 'typeorm';
import { MissionDeleteReasonEntity } from 'src/domain/mission-delete-reason/mission-delete-reason.entity';
import { MissionModel } from '../mission/mission.model';

@Entity('mission_delete_reasons')
export class MissionDeleteReasonModel implements MissionDeleteReasonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    reason: string;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @OneToOne(() => MissionModel, user => user.mission_delete_reason)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;
};