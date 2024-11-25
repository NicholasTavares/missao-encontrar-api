import { IsNotEmpty, IsString } from "class-validator";

export class CreateMissionFollowerDTO {
    @IsNotEmpty()
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty()
    @IsString()
    readonly user_id: string;
};
