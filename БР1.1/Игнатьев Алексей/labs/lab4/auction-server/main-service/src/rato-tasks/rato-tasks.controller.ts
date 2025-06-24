import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RatoTasksService } from './rato-tasks.service';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { OptionalJwtAuthGuard } from 'src/common/guards/optional-jwt.guard';
import {
  RatoTaskEntity,
  RatoTaskResponseEntity,
} from './entities/rato-task.entity';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { commonControllerFactory } from 'src/common/common.controller-default';

const CommonController = commonControllerFactory<RatoTaskEntity>({
  entity: RatoTaskEntity,
});

@Controller('rato-tasks')
export class RatoTasksController extends CommonController {
  constructor(private readonly ratoTasksService: RatoTasksService) {
    super(ratoTasksService);
  }

  @ApiBearerAuth('Bearer')
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  @ApiResponse({ type: RatoTaskResponseEntity })
  async getRatoTasks(
    @Query() params: PaginateParams,
    @Request() req: { user?: JwtUserPayloadDto },
  ): Promise<RatoTaskResponseEntity> {
    return await this.ratoTasksService.getRatoTasks(params, req.user?.id);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Get(':id')
  async getRatoTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RatoTaskEntity> {
    return await this.ratoTasksService.getRatoTaskById(id);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async createRatoTask(@Body() data: CreateTaskDto): Promise<RatoTaskEntity> {
    return await this.ratoTasksService.createRatoTask(data);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async updateRatoTask(
    @Param('id') id: number,
    @Body() data: UpdateTaskDto,
  ): Promise<RatoTaskEntity> {
    return await this.ratoTasksService.updateRatoTask(id, data);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async deleteRatoTask(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.ratoTasksService.deleteRatoTask(id);
  }
}
