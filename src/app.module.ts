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
import { PersonMissionModel } from './infrastructure/database/person-mission/person-mission.model';
import { PersonMissionService } from './domain/person-mission/person-mission.service';
import { PersonMissionRepositoryImpl } from './infrastructure/database/person-mission/person-mission.repository';
import { PetMissionModel } from './infrastructure/database/pet-mission/pet-mission.model';
import { PetMissionService } from './domain/pet-mission/pet-mission.service';
import { PetMissionRepositoryImpl } from './infrastructure/database/pet-mission/pet-mission.repository';
import { ObjectMissionModel } from './infrastructure/database/object-mission/object-mission.model';
import { ObjectMissionService } from './domain/object-mission/object-mission.service';
import { ObjectMissionRepositoryImpl } from './infrastructure/database/object-mission/object-mission.repository';
import { ObjectMissionCategoryModel } from './infrastructure/database/object-mission-categories/object-mission-categories.model';
import { ObjectMissionCategoryRepositoryImpl } from './infrastructure/database/object-mission-categories/object-mission-categories.repository';
import { ObjectMissionCategoriesService } from './domain/object-mission-categories/object-mission-categories.service';
import { ObjectMissionCategoryController } from './presentation/object-mission-categories/object-mission-categories.controller';
import { CreateObjectMissionCategoryUseCase } from './application/object-mission-categories/create-object-mission-category.use-case';
import { UpdateObjectMissionCategoryUseCase } from './application/object-mission-categories/update-object-mission-category.use-case';
import { MissionTimelineModel } from './infrastructure/database/mission-timeline/mission-timeline.model';
import { MissionTimelineRepositoryImpl } from './infrastructure/database/mission-timeline/mission-timeline.repository';
import { MissionTimelineController } from './presentation/mission-timeline/mission-timeline.controller';
import { MissionTimelineService } from './domain/mission-timeline/mission-timeline.service';
import { CreateMissionTimelineUseCase } from './application/mission-timeline/create-mission-timeline.use-case';
import { GetMissionTimelineUseCase } from './application/mission-timeline/get-mission-timeline.use-case';
import { UpdateMissionTimelineUseCase } from './application/mission-timeline/update-mission-timeline.use-case';
import { MissionFollowerModel } from './infrastructure/database/mission-followers/mission-followers.model';
import { MissionFollowersRepositoryImpl } from './infrastructure/database/mission-followers/mission-followers.repository';
import { MissionFollowersController } from './presentation/mission-followers/mission-followers.controller';
import { MissionFollowersService } from './domain/mission-followers/mission-followers.service';
import { HandleMissionFollowerUseCase } from './application/mission-followers/handle-mission-follower.use-case';
import { GetMissionFollowersCountUseCase } from './application/mission-followers/get-misson-followers-count.use-case';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        MissionModel,
        MissionCategoryModel,
        PersonMissionModel,
        PetMissionModel,
        ObjectMissionModel,
        ObjectMissionCategoryModel,
        RewardsEditionsModel,
        UserModel,
        MissionTimelineModel,
        MissionFollowerModel
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([
      MissionModel,
      MissionCategoryModel,
      PersonMissionModel,
      PetMissionModel,
      ObjectMissionModel,
      ObjectMissionCategoryModel,
      RewardsEditionsModel,
      UserModel,
      MissionTimelineModel,
      MissionFollowerModel
    ]),
  ],
  controllers: [
    MissionController,
    MissionCategoryController,
    UserController,
    ObjectMissionCategoryController,
    MissionTimelineController,
    MissionFollowersController
  ],
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
    UpdateMissionsRewardsUseCase,
    PersonMissionService,
    PersonMissionRepositoryImpl,
    PetMissionService,
    PetMissionRepositoryImpl,
    ObjectMissionService,
    ObjectMissionRepositoryImpl,
    ObjectMissionCategoriesService,
    ObjectMissionCategoryRepositoryImpl,
    CreateObjectMissionCategoryUseCase,
    UpdateObjectMissionCategoryUseCase,
    MissionTimelineRepositoryImpl,
    MissionTimelineService,
    CreateMissionTimelineUseCase,
    GetMissionTimelineUseCase,
    UpdateMissionTimelineUseCase,
    MissionFollowersRepositoryImpl,
    MissionFollowersService,
    HandleMissionFollowerUseCase,
    GetMissionFollowersCountUseCase
  ],
})
export class AppModule { }
