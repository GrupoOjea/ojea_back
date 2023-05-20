import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.mudule';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guard/constants';
import PostulationEntity from './models/entities/postulation.entity';
import { PostulationController } from './controllers/postulation.controller';
import { PostulationService } from './services/postulation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostulationEntity]),
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [PostulationController],
  providers: [PostulationService]
})
export class postulationModule {}