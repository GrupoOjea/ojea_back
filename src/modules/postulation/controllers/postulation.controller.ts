import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { createDTO, emailDTO } from '../models/dto/postulation.register.dto';
import { PostulationService } from '../services/postulation.service';

@Controller('postulation')
export class PostulationController {
  constructor(private readonly postulationService: PostulationService) {}

  @Post('create')
  async postCreateLogin(@Body() registerBody: createDTO): Promise<string>{
    return await this.postulationService.createPostulation(registerBody);
  }

  @Get(':id')
  async getPostulationJobs(@Param('id') id: number): Promise<string>{
    return this.postulationService.getPostulation(id);
  }

  @Get('information/:id')
  async getIformationPerson(@Param('id') id: number): Promise<string>{
    return this.postulationService.getInformationPerson(id);
  }

  @Post('send')
  async postSendEmail(@Body() registerBody: emailDTO): Promise<string>{
    return await this.postulationService.sendEmail(registerBody);
  }
  
}
