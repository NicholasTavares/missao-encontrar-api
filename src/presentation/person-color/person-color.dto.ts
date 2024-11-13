import { IsNotEmpty, IsString } from "class-validator";

export class CreatePersonColorDTO {
    @IsNotEmpty({ message: "Cor da pessoa é obrigatória para cadastro." })
    @IsString()
    color: string;
};