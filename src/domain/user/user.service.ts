import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryImpl } from 'src/infrastructure/database/user/user.repository';
import { CreateUserDTO } from 'src/presentation/user/user.dto';
import { EntityManager } from 'typeorm';
import { PersonGender } from '../person-mission/interfaces/person-gender.enum';

@Injectable()
export class UserService {
    private readonly MIN_FIRST_NAME_LENGTH = 3;
    private readonly MIN_LAST_NAME_LENGTH = 3;
    private readonly MIN_USER_AGE = 18;
    constructor(private readonly userRepository: UserRepositoryImpl) { }

    async createUser(createUserDTO: CreateUserDTO) {
        //TODO: ver como deve ser comportar o campo "status"
        if (createUserDTO.first_name.length < this.MIN_FIRST_NAME_LENGTH) {
            throw new BadRequestException(`Primeiro nome deve ter no mínimo ${this.MIN_FIRST_NAME_LENGTH} caracteres.`);
        };

        if (createUserDTO.last_name.length < this.MIN_LAST_NAME_LENGTH) {
            throw new BadRequestException(`Sobrenome deve ter no mínimo ${this.MIN_LAST_NAME_LENGTH} caracteres.`);
        };

        if (!createUserDTO.email.includes('@')) {
            throw new BadRequestException('Email inválido.');
        };

        if (!Object.values(PersonGender).includes(createUserDTO.gender.toLowerCase() as PersonGender)) {
            throw new BadRequestException(`Gênero inválido: ${createUserDTO.gender}.`);
        };

        const today = new Date();
        const birthDate = new Date(createUserDTO.birth_date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        if (age < this.MIN_USER_AGE) {
            throw new BadRequestException(`O usuário deve ter pelo menos ${this.MIN_USER_AGE} anos.`);
        }

        const existing_email = await this.userRepository.getUserByEmail(createUserDTO.email);

        if (existing_email) {
            throw new BadRequestException('Email já existe. Por favor, insira outro email.');
        };

        const existing_phone = await this.userRepository.getUserByPhone(createUserDTO.phone);

        if (existing_phone) {
            throw new BadRequestException('Número de celular já existe. Por favor, insira outro número.');
        };

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(createUserDTO.password)) {
            throw new BadRequestException('A senha deve conter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial.');
        };

        const created_user = await this.userRepository.createUser(createUserDTO);

        const saved_user = await this.userRepository.saveUser(created_user);

        return saved_user;
    };

    async getUserById(user_id: string, entityManager?: EntityManager) {
        const user = await this.userRepository.getUserById(user_id, entityManager);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        };

        return user;
    };
};