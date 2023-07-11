import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { createDTO, emailDTO, updatePostulationDTO, updatePostulationStateDTO } from '../models/dto/postulation.register.dto';
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

  @Get('my-jobs/:id')
  async getMyJobs(@Param('id') id: number): Promise<string>{
    return this.postulationService.getMyJobs(id);
  }

  @Put('update')
  async putCompany(@Body() registerBody: updatePostulationDTO): Promise<string>{
    return await this.postulationService.updatePostulationType(registerBody);
  }

  @Put('update-state')
  async putState(@Body() registerBody: updatePostulationStateDTO): Promise<string>{
    return await this.postulationService.updatePostulationState(registerBody);
  }

  @Post('send')
  async postSendEmail(@Body() registerBody: emailDTO): Promise<string>{
    return await this.postulationService.sendEmail(registerBody);
  }

  @Get('pdf/:id')
  async generarPdf(@Param('id') id: number): Promise<string>{
    return await this.postulationService.pdf(id);
  }
  
}
