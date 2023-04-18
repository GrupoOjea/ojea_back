import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.mudule';
import { loginModule } from './modules/login/login.module';


@Module({
  imports: [
    DatabaseModule,
    loginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
