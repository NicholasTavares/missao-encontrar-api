export class MissionCategoryEntity {
    id: string;
    category: string;
    level: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
};