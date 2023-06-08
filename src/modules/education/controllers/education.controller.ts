import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeleteDateColumn } from 'typeorm';
import { createEducationDTO, getEducationDTO, updateEducationDTO } from '../models/dto/education.register.dto';
import { EducationService } from '../services/education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService){}

  @Post('create')
  async postCreateEducation(@Body() registerBody: createEducationDTO): Promise<string>{
    return await this.educationService.createEducation(registerBody);
  }

  @Put('update')
  async putEducation(@Body() registerBody: updateEducationDTO): Promise<string>{
    return await this.educationService.updateEducation(registerBody);
  }

  @Get('get/:id')
  async getEducation(@Param('id') id: string): Promise<any>{
    return await this.educationService.getEducation(id);
  }

  @Delete('delete/:id')
  async deleteEducation(@Param('id') id: string): Promise<any>{
    return await this.educationService.deleteEducation(id);
  }
}
