export class UserEntity {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    birth_date: Date;
    gender: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
};