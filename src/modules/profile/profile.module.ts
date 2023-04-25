import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.mudule';
import { ProfileEntity } from './models/entities/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    DatabaseModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class profileModule {}