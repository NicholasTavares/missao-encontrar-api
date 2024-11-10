import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRewarsEditionsDTO {
    @IsNotEmpty({ message: 'Id da missão é obrigatório.' })
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty({ message: 'Novo valor da missão é obrigatório.' })
    @IsNumber()
    readonly value: number;
};
