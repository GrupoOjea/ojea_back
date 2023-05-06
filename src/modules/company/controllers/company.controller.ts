import { Body, Controller, Post, Put, Get, UseGuards, Param } from '@nestjs/common';
import { createCompanyDTO, updateCompanyDTO } from '../models/dto/company.register.dto';
import { CompanyService } from '../services/company.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}


  @Post('create')
  async postCreateCompany(@Body() registerBody: createCompanyDTO): Promise<string>{
    return await this.companyService.createCompany(registerBody);
  }

  @Put('update')
  async putCompany(@Body() registerBody: updateCompanyDTO): Promise<string>{
    return await this.companyService.updateCompany(registerBody);
  }

  @Get(':id')
  async fkCompany(@Param('id') id: string): Promise<string>{
    return this.companyService.getFkCompany(id);
  }

}
