import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { UpdateSettingsDto } from './dto/settings.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SettingsEntity } from './entities/settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<SettingsEntity> {
    return await this.settingsService.getSettings();
  }

  @UseGuards(BasicAuthGuard)
  @ApiBearerAuth('Basic')
  @Patch()
  async updateSettings(
    @Body() body: UpdateSettingsDto,
  ): Promise<SettingsEntity> {
    return await this.settingsService.updateSettings(body);
  }
}
