import { Module } from '@nestjs/common';
import { AdminController } from './app.controller';
import { PrismaClient } from '@prisma/client';
import { BrandsController } from './brands/brands.controller';
import { CategoriesController } from './categories/categories.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AdminService } from './app.service';
import { BrandsService } from './brands/brands.service';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HttpModule.register({
      timeout: 30000, // 30 секунд
      maxRedirects: 5,
      validateStatus: (status: number) => status < 500, // Принимаем все статусы меньше 500
    }),
  ],
  controllers: [AdminController, BrandsController, CategoriesController],
  providers: [PrismaClient, AdminService, BrandsService, CategoriesService],
})
export class AppModule {}
