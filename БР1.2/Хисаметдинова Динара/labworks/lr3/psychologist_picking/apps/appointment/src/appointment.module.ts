import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { User } from '../../user/src/user/user.entity';
import { Psychologist } from '../models/psychologist.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from '../controllers/appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Psychologist])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
