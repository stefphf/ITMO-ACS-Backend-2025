import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/bull.interface';
import { RedisModule } from 'src/config/redis/redis.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtAuthGuard } from './jwt.guard';
import { IpApiModule } from 'src/config/ip-api/ip-api.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
    IpApiModule,
    BullModule.registerQueue({ name: QUEUE_NAME.smtp }),
    RedisModule,
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaClient,
    JwtStrategy,
    ConfigService,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
