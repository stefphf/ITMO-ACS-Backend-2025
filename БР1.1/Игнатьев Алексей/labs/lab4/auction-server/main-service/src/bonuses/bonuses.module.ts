import { Module } from '@nestjs/common';
import { BonusesService } from './bonuses.service';
import { BonusesController } from './bonuses.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [],
  providers: [BonusesService, PrismaClient],
  exports: [BonusesService],
})
export class BonusesModule {}
