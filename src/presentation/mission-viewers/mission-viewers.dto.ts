import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMissionViewerDTO {
    @IsNotEmpty()
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty()
    @IsString()
    readonly user_id: string;

    @IsOptional()
    @IsString()
    readonly device_info?: string;
};