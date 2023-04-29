import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { profileDTO } from '../models/dto/profile.register.dto';

@Controller('profile')
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {}

  @Get('get')
  async getProfile(@Body() registerBody: profileDTO): Promise<string>{
    return await this.profileService.getProfile(registerBody);
  }

}
