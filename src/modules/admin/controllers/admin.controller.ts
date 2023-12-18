import { Body, Controller, Post, Put, Get, UseGuards, Param } from '@nestjs/common';
import { createAdminDTO, updateAdminDTO } from '../models/dto/admin.register.dto';
import { AdminService } from '../services/admin.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly AdminService: AdminService) {}

  @Get()
  async getAllUser(): Promise<string>{
    return this.AdminService.getAllUser();
  }


  @Post('create')
  async postCreateAdmin(@Body() registerBody: createAdminDTO): Promise<string>{
    return await this.AdminService.createAdmin(registerBody);
  }

  @Put('update')
  async putAdmin(@Body() registerBody: updateAdminDTO): Promise<string>{
    return await this.AdminService.updateAdmin(registerBody);
  }

  @Get(':id')
  async fkAdmin(@Param('id') id: string): Promise<string>{
    return this.AdminService.getFkAdmin(id);
  }

}
