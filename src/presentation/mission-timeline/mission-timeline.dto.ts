import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMissionTimelineDTO {
    @IsNotEmpty()
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty()
    @IsString()
    readonly user_id: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly update_type: string;

    @IsNotEmpty()
    @IsString()
    readonly visibility: string;
};

export class UpdateMissionTimelineDTO {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsString()
    readonly update_type?: string;

    @IsOptional()
    @IsString()
    readonly visibility?: string;
}