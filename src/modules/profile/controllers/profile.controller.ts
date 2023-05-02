import { Body, Controller, Get, Param, Post, Put, Query  } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { personDTO } from '../models/dto/profile.register.dto';

@Controller('profile')
export class ProfileController {

  constructor(private readonly profileService: ProfileService){}

  @Get('get')
  async getProfile(@Query() queryParams) {
    const result = await this.profileService.getPerson(queryParams);
    return result;
  }

  @Get(':id')
  async idPerson(@Param('id') id: string): Promise<string>{
    return this.profileService.getIdPerson(id);
  }

}
