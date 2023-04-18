import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './models/entities/login.entity';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { DatabaseModule } from 'src/database/database.mudule';


@Module({
  imports: [
    TypeOrmModule.forFeature([LoginEntity]),
    DatabaseModule
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class loginModule {}