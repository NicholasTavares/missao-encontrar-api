import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMissionDTO {
    @IsNotEmpty({ message: 'Id do usuário é obrigatório.' })
    @IsString()
    readonly user_id: string;

    @IsNotEmpty({ message: 'Título da missão é obrigatório.' })
    @IsString()
    readonly title: string;

    @IsNotEmpty({ message: 'Descrição da missão é obrigatória.' })
    @IsString()
    readonly description: string;

    //TODO: lembrar de informar o usuário que depois não diminuir a recompensa da missão

    @IsNotEmpty({ message: 'Recompensa da missão é obrigatória.' })
    @IsNumber()
    readonly current_reward: number;

    //TODO: pensar em qual mensagem é adequada para latitude e longitude

    @IsNotEmpty()
    @IsNumber()
    readonly latitude: number;

    @IsNotEmpty()
    @IsNumber()
    readonly longitude: number;

    //TODO: lembrar de informar o usuário que depois não é possível mudar a categoria da missão

    @IsNotEmpty()
    @IsString()
    readonly category_id: string;
};

export class UpdateMissionDTO {
    @IsNotEmpty({ message: 'Id da missão é obrigatório.' })
    @IsString()
    readonly mission_id: string;

    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    //TODO: pensar em qual mensagem é adequada para latitude e longitude

    @IsOptional()
    @IsNumber()
    readonly latitude?: number;

    @IsOptional()
    @IsNumber()
    readonly longitude?: number;
};

export class UpdateMissionRewardsDTO {
    @IsNotEmpty({ message: 'Id da missão é obrigatório.' })
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty({ message: 'Nova recompensa da missão é obrigatória.' })
    @IsNumber()
    readonly reward: number;
};