import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    Relation,
} from 'typeorm';
import { MissionModel } from '../mission/mission.model';
import { RewardsEditionsEntity } from 'src/domain/rewards-editions/rewards-editions.entity';

@Entity('rewards_editions')
export class RewardsEditionsModel implements RewardsEditionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: number;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @ManyToOne(() => MissionModel, mission => mission.rewards_editions)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>;

    @CreateDateColumn({ name: 'edited_at', type: 'timestamp' })
    edited_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
}