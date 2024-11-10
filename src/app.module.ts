import { Module } from '@nestjs/common';
import { MissionController } from './presentation/mission/mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionModel } from './infrastructure/database/mission/mission.model';
import { GetAllMissionsUseCase } from './application/mission/get-all-missions.use-case';
import { MissionService } from './domain/mission/mission.service';
import { MissionRepositoryImpl } from './infrastructure/database/mission/mission.repository';
import { UserModel } from './infrastructure/database/user/user.model';
import { UserController } from './presentation/user/user.controller';
import { UserService } from './domain/user/user.service';
import { GetUserByIdUseCase } from './application/user/get-user-by-id.use-case';
import { UserRepositoryImpl } from './infrastructure/database/user/user.repository';
import { CreateMissionUseCase } from './application/mission/create-mission.use-case';
import { CreateUserUseCase } from './application/user/create-user.use-case';
import { MissionCategoryModel } from './infrastructure/database/mission-categories/mission-categories.model';
import { MissionCategoryController } from './presentation/mission-categories/mission-categories.controller';
import { MissionCategoryService } from './domain/mission-categories/mission-categories.service';
import { MissionCategoriesRepositoryImpl } from './infrastructure/database/mission-categories/mission-categories.repository';
import { CreateMissionCategoryUseCase } from './application/mission-categories/create-mission-category.use-case';
import { UpdateMissionCategoryUseCase } from './application/mission-categories/update-mission-category.use-case';
import { RewardsEditionsModel } from './infrastructure/database/rewards-editions/rewards-editions.model';
import { RewardsEditionsService } from './domain/rewards-editions/rewards-editions.service';
import { RewardsEditionsRepositoryImpl } from './infrastructure/database/rewards-editions/rewards-editions.repository';
import { UpdateMissionsUseCase } from './application/mission/update-mission.use-case';
import { UpdateMissionsRewardsUseCase } from './application/mission/update-mission-rewards.use-case';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [MissionModel, MissionCategoryModel, RewardsEditionsModel, UserModel],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([MissionModel, MissionCategoryModel, RewardsEditionsModel, UserModel]),
  ],
  controllers: [MissionController, MissionCategoryController, UserController],
  providers: [
    MissionService,
    GetAllMissionsUseCase,
    CreateMissionUseCase,
    MissionRepositoryImpl,
    UserService,
    GetUserByIdUseCase,
    UserRepositoryImpl,
    CreateUserUseCase,
    MissionCategoryService,
    MissionCategoriesRepositoryImpl,
    CreateMissionCategoryUseCase,
    UpdateMissionCategoryUseCase,
    RewardsEditionsRepositoryImpl,
    RewardsEditionsService,
    UpdateMissionsUseCase,
    UpdateMissionsRewardsUseCase
  ],
})
export class AppModule { }
