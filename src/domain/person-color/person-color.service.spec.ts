import { PersonColorRepositoryImpl } from "src/infrastructure/database/person-color/person-color.repository";
import { PersonColorService } from "./person-color.service";
import { CreatePersonColorDTO } from "src/presentation/person-color/person-color.dto";
import { Test, TestingModule } from "@nestjs/testing";

describe('PersonColorService', () => {
    let service: PersonColorService;
    let repository: PersonColorRepositoryImpl;

    const color_id = "e171bb26-444a-4ffb-b802-595941433460";

    const validPersonColorDTO: CreatePersonColorDTO = {
        color: "branca",
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PersonColorService,
                {
                    provide: PersonColorRepositoryImpl,
                    useValue: {
                        getPersonColorByColor: jest.fn(),
                        getPersonColorById: jest.fn(),
                        createPersonColor: jest.fn(),
                        savePersonColor: jest.fn()
                    },
                },
            ],
        }).compile();

        service = module.get<PersonColorService>(PersonColorService);
        repository = module.get<PersonColorRepositoryImpl>(PersonColorRepositoryImpl);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('createPersonColor', () => {
        it('should throw an error if a color already exists.', async () => {
            validPersonColorDTO
            jest.spyOn(repository, 'getPersonColorByColor').mockResolvedValue(validPersonColorDTO as any);

            await expect(service.createPersonColor(validPersonColorDTO)).rejects.toThrow(`Cor ${validPersonColorDTO.color} já existe.`);
        });

        it('should create a new color succesfully.', async () => {
            jest.spyOn(repository, 'getPersonColorByColor').mockResolvedValue(null);
            jest.spyOn(repository, 'createPersonColor').mockReturnValue(validPersonColorDTO as any);
            jest.spyOn(repository, 'savePersonColor').mockResolvedValue(validPersonColorDTO as any);

            const result = await service.createPersonColor(validPersonColorDTO);

            expect(result).toEqual(validPersonColorDTO);
        });
    });

    describe('getPersonColorById', () => {
        it('should throw an error if the color does not exist.', async () => {
            jest.spyOn(repository, 'getPersonColorById').mockResolvedValue(null);

            await expect(service.getPersonColorById(color_id)).rejects.toThrow(`Cor ${color_id} não encontrada.`);
        });

        it('should return the color successfully.', async () => {
            jest.spyOn(repository, 'getPersonColorById').mockResolvedValue(validPersonColorDTO as any);

            const result = await service.getPersonColorById(color_id);

            expect(result).toEqual(validPersonColorDTO);
        });
    });
});