import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserParams } from './params/user.params';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { UserDetailDto } from './dto/user-detail.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getAllUsers(@Query() params: UserParams): Promise<UserEntity[]> {
    return await this.adminService.getAllUsers(params);
  }

  @Get('user/:id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return await this.adminService.getUser(id);
  }

  @Get('user/:id/stats')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getUserInfo(@Param('id') id: number): Promise<UserDetailDto> {
    return await this.adminService.getUserInfo(id);
  }

  @Post('verify')
  async verifyAdmin(@Body() body: AdminLoginDto): Promise<StatusOKDto> {
    return await this.adminService.verifyAdmin(body);
  }
}
