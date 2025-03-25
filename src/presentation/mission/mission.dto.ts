import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, registerDecorator } from "class-validator";
import { CreatePersonMissionDTO } from "../person-mission/person-mission.dto";
import { CreatePetMissionDTO } from "../pet-mission/pet-mission.dto";
import { CreateObjectMissionDTO } from "../object-mission/object-mission.dto";

export function AtLeastOne(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'atLeastOne',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const mission_details_person = value[0];
                    const mission_details_pet = value[1];
                    const mission_details_object = value[2];

                    if (!mission_details_person && !mission_details_pet && !mission_details_object) return false;

                    return true;
                },
                defaultMessage() {
                    return 'Pelo menos um dos detalhes da missão (pessoa, pet ou objeto) deve ser fornecido.';
                }
            }
        });
    };
}
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

    @IsNotEmpty({ message: 'Tipo de detalhes da missão é obrigatório.' })
    @IsString()
    readonly mission_details_type: string;

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

// TODO: ver se é importante validar se mission_details_person e mission_details_pet não podem ser fornecidos ao mesmo tempo
export class MissionDTO {
    @IsObject()
    mission: CreateMissionDTO;

    @IsOptional()
    @IsObject()
    mission_details_person?: CreatePersonMissionDTO;

    @IsOptional()
    @IsObject()
    mission_details_pet?: CreatePetMissionDTO;

    @IsOptional()
    @IsObject()
    mission_details_object?: CreateObjectMissionDTO;

    @AtLeastOne()
    get MissionDetailsValidation(): [CreatePersonMissionDTO, CreatePetMissionDTO, CreateObjectMissionDTO] {
        return [this.mission_details_person, this.mission_details_pet, this.mission_details_object];
    }
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

export class DeleteMissionDTO {
    @IsNotEmpty({ message: 'ID do usuário é obrigatório.' })
    @IsString()
    readonly user_id: string;

    @IsNotEmpty({ message: 'ID da missão obrigatório.' })
    @IsString()
    readonly mission_id: string;

    @IsNotEmpty({ message: 'Razão é obrigatória.' })
    @IsString()
    readonly reason: string;
}