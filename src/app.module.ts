import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.mudule';
import { loginModule } from './modules/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guard/constants';
import { profileModule } from './modules/profile/profile.module';
import { companyModule } from './modules/company/company.module';
import { jobsModule } from './modules/jobs/jobs.module';
import { postulationModule } from './modules/postulation/postulation.module';
import { SkillsService } from './modules/skills/services/skills.service';
import { skillsModule } from './modules/skills/skills.module';
import { educationModule } from './modules/education/education.module';
import { AdminModule } from './modules/admin/admin.module';


@Module({
  imports: [
    DatabaseModule,
    loginModule,
    profileModule,
    companyModule,
    jobsModule,
    postulationModule,
    skillsModule,
    educationModule,
    AdminModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}