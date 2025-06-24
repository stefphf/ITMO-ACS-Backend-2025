import { Module } from '@nestjs/common';
import { PromocodesController } from './app.controller';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PromocodesService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HttpModule.register({
      timeout: 30000, // 30 секунд
      maxRedirects: 5,
      validateStatus: (status: number) => status < 500, // Принимаем все статусы меньше 500
    }),
  ],
  controllers: [PromocodesController],
  providers: [PrismaClient, PromocodesService],
})
export class AppModule {}
