import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SettingsEntity } from './entities/settings.entity';
import { UpdateSettingsDto } from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaClient) {}

  async getSettings(): Promise<SettingsEntity> {
    const settings = await this.prisma.settings.findUnique({
      where: { settings_id: 1 },
      select: {
        cost_per_spin: true,
        settings_id: true,
        first_deposit_bonus: true,
      },
    });
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    return settings;
  }

  async updateSettings(dto: UpdateSettingsDto) {
    return this.prisma.settings.update({
      where: { settings_id: 1 },
      data: dto,
    });
  }
}
