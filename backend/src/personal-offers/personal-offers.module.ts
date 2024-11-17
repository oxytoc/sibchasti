import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios/dist/http.module';

import { PersonalOffersService } from './personal-offers.service';
import { PersonalOffersController } from './personal-offers.controller';
import { PartsManagerModule } from 'src/parts-manager/parts-manager.module';
import { Part } from 'src/parts-manager/entity/part.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    HttpModule,
    PartsManagerModule,
    TypeOrmModule.forFeature([Part]),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [PersonalOffersController],
  providers: [PersonalOffersService],
  exports: [PersonalOffersModule]
})
export class PersonalOffersModule {}
