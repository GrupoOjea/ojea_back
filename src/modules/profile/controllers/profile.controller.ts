import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { personDTO } from '../models/dto/profile.register.dto';

@Controller('profile')
export class ProfileController {

  constructor(private readonly profileService: ProfileService){}

  @Get('get')
  async loadJobs(@Body() personBody): Promise<string>{
    return this.profileService.getPerson(personBody);
  }

}
import { Controller } from '@nestjs/common';

@Controller('profile')
export class ProfileController {}
