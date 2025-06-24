import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserParams } from './params/user.params';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserDetailDto } from './dto/user-detail.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { StatusOKDto } from './dto/status.dto';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
  ) {}

  private getMainServiceUrl(): string {
    return `http://${this.configService.get('MAIN_SERVICE_HOST')}:${this.configService.get('MAIN_SERVICE_PORT')}`;
  }

  @Get('auctions/:id/stats')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  async getAuctionStats(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<any> {
    const res = await firstValueFrom(
      this.httpService.get(`${this.getMainServiceUrl()}/auctions/${id}/stats`, {
        headers: req.headers as any,
      }),
    );
    return res.data;
  }

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
