export class MissionFollowerEntity {
    id: string;
    mission_id: string;
    user_id: string;
    followed_at: Date;
    unfollowed_at?: Date;
};