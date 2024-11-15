export class MissionEntity {
    id: string;
    user_id: string;
    title: string;
    description: string;
    mission_details_type: string;
    initial_reward: number;
    current_reward: number;
    lowest_reward?: number;
    latitude: number;
    longitude: number;
    status?: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
};