import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../../libs/shared/guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../user/src/user/user.entity';
import { UserModule } from '../../user/src/user/user.module';
import { AuthModule } from '../../user/src/auth/auth.module';
import { ChatModule } from '../../chat/src/chat/chat.module';
import { MessageModule } from './routes/message.module';
import { AppointmentModule } from '../../appointment/src/appointment.module';
import { ReviewModule } from '../../review/src/review.module';
import { PsychologistModule } from '../../psychologist/src/psychologist/psychologist.module';
import { SpecializationModule } from './routes/specialization.module';
import { ScheduleModule } from '../../psychologist/src/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/models/*.entity.{ts,js}'],
        synchronize: true,
        logging: true,
      }),
    }),

    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    ScheduleModule,
    ReviewModule,
    AppointmentModule,
    PsychologistModule,
    SpecializationModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
