import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'Primeiro nome é obrigatório.' })
    @IsString()
    first_name: string;

    @IsNotEmpty({ message: 'Sobrenome nome é obrigatório.' })
    @IsString()
    last_name: string;

    @IsNotEmpty({ message: 'Email é obrigatório.' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Celular é obrigatório.' })
    @IsString()
    phone: string;

    @IsNotEmpty({ message: 'Senha é obrigatória.' })
    @IsString()
    password: string;

    @IsNotEmpty({ message: 'Data de nascimento é obrigatória.' })
    @IsDateString()
    birth_date: Date;

    @IsNotEmpty({ message: 'Gênero é obrigatório.' })
    @IsString()
    gender: string;
}