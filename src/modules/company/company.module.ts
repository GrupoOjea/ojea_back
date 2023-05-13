import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.mudule';
import { CompanyEntity } from './models/entities/company.entity';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guard/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class companyModule {}