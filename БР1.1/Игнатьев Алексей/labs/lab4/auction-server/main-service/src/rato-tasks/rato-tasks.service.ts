import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, RatoTask } from '@prisma/client';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import {
  RatoTaskEntity,
  RatoTaskResponseEntity,
} from './entities/rato-task.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class RatoTasksService extends CommonService<RatoTaskEntity> {
  constructor(protected prisma: PrismaClient) {
    super(prisma);
  }

  async getRatoTasks(
    params: PaginateParams,
    userId?: number,
  ): Promise<RatoTaskResponseEntity> {
    const { skip, take } = params;

    if (userId) {
      const tasks = await this.prisma.ratoTask.findMany({
        ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
        include: {
          user_tasks: {
            where: {
              user_id: userId,
              completed_at: { not: null },
            },
          },
        },
      });

      return {
        items: tasks.map(({ user_tasks, ...task }) => ({
          ...task,
          is_completed: user_tasks.length > 0,
        })),
        total_items: tasks.length,
      };
    }

    const tasks = await this.prisma.ratoTask.findMany({
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
    });
    return {
      items: tasks,
      total_items: tasks.length,
    };
  }

  async getRatoTaskById(id: number): Promise<RatoTask> {
    const task = await this.prisma.ratoTask.findUnique({
      where: { rato_task_id: id },
    });
    if (!task) {
      throw new NotFoundException('Rato task not found');
    }
    return task;
  }

  async createRatoTask(data: CreateTaskDto): Promise<RatoTask> {
    return this.prisma.ratoTask.create({ data });
  }

  async updateRatoTask(id: number, data: UpdateTaskDto): Promise<RatoTask> {
    return this.prisma.ratoTask.update({
      where: { rato_task_id: id },
      data,
    });
  }

  async deleteRatoTask(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.ratoTask.delete({ where: { rato_task_id: id } });
      return new StatusOKDto();
    } catch (error) {
      throw new NotFoundException('Rato task not found');
    }
  }
}
