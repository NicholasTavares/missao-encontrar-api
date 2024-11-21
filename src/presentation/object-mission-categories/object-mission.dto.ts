import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateObjectMissionCategoryDTO {
    @IsNotEmpty({ message: 'Nome da categoria do objecto é obrigatório.' })
    @IsString()
    category: string;

    @IsNotEmpty({ message: 'Descrição da categoria do objecto é obrigatório.' })
    @IsString()
    description: string;
};

export class UpdateObjectMissionCategoryDTO {
    @IsNotEmpty({ message: 'Id da categoria da objeto é obrigatório.' })
    @IsString()
    readonly category_id: string;

    @IsOptional()
    @IsString()
    readonly category?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;
};