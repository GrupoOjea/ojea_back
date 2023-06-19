import { Body, Controller, Post, Put, Get, Param, Delete } from '@nestjs/common';
import { skillsRegisterDTO, skillsUpdateDTO } from '../models/dto/skills.register.dto';
import { SkillsService } from '../services/skills.service';

@Controller('skills')
export class SkillsController {

  constructor(private readonly skillsService: SkillsService) {}

  @Post('create')
  async postSkills(@Body() registerBody: skillsRegisterDTO): Promise<string>{
    return await this.skillsService.createSkills(registerBody); 
  }

  @Put('update')
  async putSkills(@Body() registerBody: skillsUpdateDTO): Promise<string>{
    return await this.skillsService.updateSkills(registerBody); 
  }

  @Get('mainskills')
  async getMainSkills(): Promise<string>{
    return await this.skillsService.getMainSkills(); 
  }

  @Get('subskills/:id')
  async getSubSkills(@Param('id') id: string): Promise<string>{
    return await this.skillsService.getSubSkills(id); 
  }

  @Get(':id')
  async idPerson(@Param('id') id: string): Promise<string>{
    return this.skillsService.searchSkills(id);
  }

  @Delete('delete/:id')
  async deleteSkills(@Param('id') id: string): Promise<any>{
    return await this.skillsService.deleteSkills(id);
  }

  


}

