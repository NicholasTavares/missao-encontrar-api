import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMissionCategoryDTO {
    @IsNotEmpty({ message: 'Categoria da missão é obrigatória.' })
    @IsString()
    readonly category: string;

    @IsNotEmpty({ message: 'Nível da categoria é obrigatório.' })
    @IsNumber()
    readonly level: number;

    @IsNotEmpty({ message: 'Descrição da categoria é obrigatória.' })
    @IsString()
    readonly description: string;
};

export class UpdateMissionCategoryDTO {
    @IsNotEmpty({ message: 'Id da categoria da missão é obrigatório.' })
    @IsString()
    readonly category_id: string;

    @IsOptional()
    @IsString()
    readonly category?: string;

    @IsOptional()
    @IsNumber()
    readonly level?: number;

    @IsOptional()
    @IsString()
    readonly description?: string;
};