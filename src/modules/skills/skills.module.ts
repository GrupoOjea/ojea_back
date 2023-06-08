import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.mudule';
import { SkillsEntity } from './models/entities/skills.entity';
import { SkillsController } from './controllers/skills.controller';
import { SkillsService } from './services/skills.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsEntity]),
    DatabaseModule
  ],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class skillsModule {}