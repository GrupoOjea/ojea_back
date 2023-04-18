import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { registerDTO } from '../models/dto/login.register.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService){}

  @Post('create')
  async postCreateLogin(@Body() registerBody: registerDTO): Promise<string>{
    return await this.loginService.createLogin(registerBody);
  }


}
