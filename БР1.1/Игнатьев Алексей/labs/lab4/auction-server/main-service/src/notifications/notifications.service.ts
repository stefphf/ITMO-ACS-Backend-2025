import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import {
  NotificationEntity,
  NotificationResponseEntity,
} from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { PusherService } from 'src/config/pusher/pusher.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NotificationsService extends CommonService<NotificationEntity> {
  constructor(
    private pusherService: PusherService,
    prisma: PrismaClient,
  ) {
    super(prisma);
  }

  async create(
    createDto: CreateNotificationDto,
    userId: number,
  ): Promise<NotificationEntity> {
    const { type, message, value } = createDto;
    const notification = await this.prisma.notification.create({
      data: {
        user_id: userId,
        type,
        message,
        value,
      },
    });
    this.pusherService.trigger(
      `user-${userId}`,
      'new-notification',
      notification,
    );
    return notification;
  }

  async findAll(
    params: PaginateParams,
    userId: number,
  ): Promise<NotificationResponseEntity> {
    const { skip, take } = params;
    const notifications = await this.prisma.notification.findMany({
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return {
      items: notifications,
      total_items: notifications.length,
    };
  }
}
