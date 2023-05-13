import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.mudule';
import { JobsService } from './services/jobs.service';
import { JobsController } from './controllers/jobs.controller';
import { JobsEntity } from './models/entities/jobs.entity';
import { CompanyEntity } from '../company/models/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobsEntity, CompanyEntity]),
    DatabaseModule
  ],
  controllers: [JobsController],
  providers: [JobsService]
})
export class jobsModule {}