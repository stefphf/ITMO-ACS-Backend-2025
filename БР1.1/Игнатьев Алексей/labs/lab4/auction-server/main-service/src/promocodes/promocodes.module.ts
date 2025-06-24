import { Module } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { PromocodesController } from './promocodes.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [],
  providers: [PromocodesService, PrismaClient],
  exports: [PromocodesService],
})
export class PromocodesModule {}
