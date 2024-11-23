import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepositoryImpl } from 'src/infrastructure/database/user/user.repository';
import { CreateUserDTO } from 'src/presentation/user/user.dto';

describe('UserService', () => {
    let service: UserService;
    let repository: UserRepositoryImpl;

    const MIN_FIRST_NAME_LENGTH = 3;
    const MIN_LAST_NAME_LENGTH = 3;
    const MIN_USER_AGE = 18;

    const validUserDTO: CreateUserDTO = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        birth_date: new Date('1990-01-01'),
        password: 'Password@123',
        gender: 'masculino',
    };
    const user_id = '3e984c39-421e-4550-bc14-52ea36de9ad8';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepositoryImpl,
                    useValue: {
                        getUserByEmail: jest.fn(),
                        getUserByPhone: jest.fn(),
                        createUser: jest.fn(),
                        getUserById: jest.fn(),
                        saveUser: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepositoryImpl>(UserRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createUser', () => {
        it(`should throw BadRequestException if first_name is less than ${MIN_FIRST_NAME_LENGTH} characters`, async () => {
            const dto = { ...validUserDTO, first_name: 'Jo' };

            await expect(service.createUser(dto)).rejects.toThrow(
                `Primeiro nome deve ter no mínimo ${MIN_FIRST_NAME_LENGTH} caracteres.`,
            );
        });

        it(`should throw BadRequestException if last_name is less than ${MIN_LAST_NAME_LENGTH} characters`, async () => {
            const dto = { ...validUserDTO, last_name: 'Do' };

            await expect(service.createUser(dto)).rejects.toThrow(
                `Sobrenome deve ter no mínimo ${MIN_LAST_NAME_LENGTH} caracteres.`,
            );
        });

        it('should throw BadRequestException if email is invalid', async () => {
            const dto = { ...validUserDTO, email: 'johndoeexample.com' };

            await expect(service.createUser(dto)).rejects.toThrow('Email inválido.');
        });

        it(`should throw BadRequestException if user is under ${MIN_USER_AGE} years old`, async () => {
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 17,
                today.getMonth(),
                today.getDate() + 1,
            );
            const dto = {
                ...validUserDTO,
                birth_date: new Date(birthDate.toISOString().split('T')[0]),
            };

            await expect(service.createUser(dto)).rejects.toThrow(
                `O usuário deve ter pelo menos ${MIN_USER_AGE} anos.`,
            );
        });

        it(`should throw BadRequestException if gender is invalid`, async () => {
            const dto = { ...validUserDTO, gender: 'invalid_gender' };

            await expect(service.createUser(dto)).rejects.toThrow(
                `Gênero inválido: ${dto.gender}.`,
            );
        });

        it('should throw BadRequestException if email already exists', async () => {
            jest.spyOn(repository, 'getUserByEmail').mockResolvedValueOnce({} as any);

            await expect(service.createUser(validUserDTO)).rejects.toThrow(
                'Email já existe. Por favor, insira outro email.',
            );
            expect(repository.getUserByEmail).toHaveBeenCalledWith(validUserDTO.email);
        });

        it('should throw BadRequestException if phone already exists', async () => {
            jest.spyOn(repository, 'getUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'getUserByPhone').mockResolvedValueOnce({} as any);

            await expect(service.createUser(validUserDTO)).rejects.toThrow(
                'Número de celular já existe. Por favor, insira outro número.',
            );
            expect(repository.getUserByPhone).toHaveBeenCalledWith(validUserDTO.phone);
        });

        it('should throw BadRequestException if password does not meet criteria', async () => {
            const dto = { ...validUserDTO, password: 'pass' };

            jest.spyOn(repository, 'getUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'getUserByPhone').mockResolvedValueOnce(null);

            await expect(service.createUser(dto)).rejects.toThrow(
                'A senha deve conter no mínimo 6 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial.',
            );
        });

        it('should create and save user successfully', async () => {
            jest.spyOn(repository, 'getUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'getUserByPhone').mockResolvedValueOnce(null);
            jest.spyOn(repository, 'createUser').mockResolvedValueOnce(validUserDTO as any);
            jest.spyOn(repository, 'saveUser').mockResolvedValueOnce(validUserDTO as any);

            const result = await service.createUser(validUserDTO);

            expect(repository.createUser).toHaveBeenCalledWith(validUserDTO);
            expect(repository.saveUser).toHaveBeenCalledWith(validUserDTO);
            expect(result).toEqual(validUserDTO);
        });
    });

    describe('getUserById', () => {
        it('repository should be defined', async () => {
            jest.spyOn(repository, 'getUserById').mockResolvedValueOnce(null);
            await expect(service.getUserById(user_id)).rejects.toThrow(
                'Usuário não encontrado.',
            );
        });

        it('should return au user successfully', async () => {
            jest.spyOn(repository, 'getUserById').mockResolvedValueOnce(validUserDTO as any);

            const result = await service.getUserById(user_id);
            expect(result).toEqual(validUserDTO);
        });
    });
});