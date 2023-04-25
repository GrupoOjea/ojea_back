import { Body, Controller, Get, Post, Put, Headers } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { registerDTO, sessionDTO } from '../models/dto/login.register.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('create')
  async postCreateLogin(@Body() registerBody: registerDTO): Promise<string>{
    return await this.loginService.createLogin(registerBody);
  }

  @Post('session')
  async postSessionLogin(@Body() sessionBody: sessionDTO): Promise<string>{
    return await this.loginService.sessionLogin(sessionBody);
  }


}