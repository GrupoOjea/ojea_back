import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.mudule';
import { loginModule } from './modules/login/login.module';
import { profileModule } from './modules/profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guard/constants';


@Module({
  imports: [
    DatabaseModule,
    loginModule,
    profileModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}