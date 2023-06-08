import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../database/database.module';
import { EducationEntity } from './models/entities/education.entity';
import { EducationController } from './controllers/education.controller';
import { EducationService } from './services/education.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationEntity]),
    DatabaseModule
  ],
  controllers: [EducationController],
  providers: [EducationService]
})
export class educationModule {}