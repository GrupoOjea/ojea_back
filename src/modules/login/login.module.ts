import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './models/entities/login.entity';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { DatabaseModule } from 'src/database/database.mudule';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guard/constants';
import { ProfileEntity } from '../profile/models/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginEntity, ProfileEntity]),
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class loginModule {}