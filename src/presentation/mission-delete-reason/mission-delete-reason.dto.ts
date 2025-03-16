import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMissionDeleteReasonDTO {
    @IsNotEmpty({ message: 'ID da missão é obrigatório.' })
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty({ message: 'Razão é obrigatória.' })
    @IsNumber()
    readonly reason: string;
};