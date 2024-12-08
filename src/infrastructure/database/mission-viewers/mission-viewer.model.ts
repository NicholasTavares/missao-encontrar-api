import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { MissionModel } from "../mission/mission.model";
import { UserModel } from "../user/user.model";
import { MissionViewerEntity } from "src/domain/mission-viewers/mission-viewer.entity";

@Entity('mission_viewers')
export class MissionViewerModel implements MissionViewerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'device_info', nullable: true })
    device_info?: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @ManyToOne(() => UserModel, user => user.missions_views)
    @JoinColumn({ name: 'user_id' })
    user: Relation<UserModel>;

    @Column({ name: 'mission_id' })
    mission_id: string;

    @ManyToOne(() => MissionModel, mission => mission.mission_viewers)
    @JoinColumn({ name: 'mission_id' })
    mission: Relation<MissionModel>;

    @CreateDateColumn({ name: 'viewed_at', type: 'timestamp' })
    viewed_at: Date;
};