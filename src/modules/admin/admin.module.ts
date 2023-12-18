import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.mudule';
import { AdminEntity } from './models/entities/Admin.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guard/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}