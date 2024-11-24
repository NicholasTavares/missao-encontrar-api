import { MissionTimelineEntity } from "src/domain/mission-timeline/mission-timeline.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { MissionModel } from "../mission/mission.model";
import { UserModel } from "../user/user.model";

@Entity('mission_timeline')
export class MissionTimelineModel implements MissionTimelineEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'update_type' })
    update_type: string;

    @Column()
    visibility: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @ManyToOne(() => UserModel, user => user.missions_timeline)
    @JoinColumn({ name: 'user_id' })
    user: Relation<UserModel>;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @ManyToOne(() => MissionModel, mission => mission.mission_timeline)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at?: Date;
}