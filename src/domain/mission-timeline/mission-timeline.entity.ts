export class MissionTimelineEntity {
    id: string;
    mission_id: string;
    user_id: string;
    title: string;
    description: string;
    update_type: string;
    visibility: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}