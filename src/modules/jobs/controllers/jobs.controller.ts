import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { createJobsDTO, searchJobsDTO, updateJobsDTO } from '../models/dto/jobs.register.dto';
import { JobsService } from '../services/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService){}

  @Post('create')
  async postCreateJobs(@Body() registerBody: createJobsDTO): Promise<string>{
    return this.jobsService.createJobs(registerBody);
  }

  @Put('update')
  async putJobs(@Body() registerBody: updateJobsDTO): Promise<string>{
    return this.jobsService.updateJobs(registerBody);
  }

  @Get('search')
  async getJobs(@Body() registerBody: searchJobsDTO): Promise<string>{
    return this.jobsService.searchJobs(registerBody);
  }

  @Get('load')
  async loadJobs(): Promise<string>{
    return this.jobsService.loadJobs();
  }

  @Get(':id')
  async idJobs(@Param('id') id: string): Promise<string>{
    return this.jobsService.idJobs(id);
  }

}
