import { Body, Controller, Get, Post, Put, Headers } from '@nestjs/common';
import { newPasswordDTO, registerDTO, resetPasswordDTO, sessionDTO } from '../models/dto/login.register.dto';
import { LoginService } from '../services/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService)  {}

  @Post('create')
  async postCreateLogin(@Body() registerBody: registerDTO): Promise<string>{
    return await this.loginService.createLogin(registerBody);
  }

  @Post('session')
  async postSessionLogin(@Body() sessionBody: sessionDTO): Promise<string>{
    return await this.loginService.sessionLogin(sessionBody);
  }

  @Put('forgot-password')
  async forgotPassword(@Body() reqbody: resetPasswordDTO){
    return await this.loginService.forgotPassword(reqbody);
  }
    
  @Put('new-password')
  async createNewPassword(@Body() reqbody: newPasswordDTO){
    return await this.loginService.createPassword(reqbody);
  }

  @Post('valid-sms')
  async validsms(@Body() reqbody){
    console.log(reqbody)
    return await this.loginService.validateSmsToken(reqbody.smstoken);
  }

}