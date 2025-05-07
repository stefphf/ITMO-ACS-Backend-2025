import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { WorkExperiencesService } from './workExperiences.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateWorkExperiencesDto, TUpdateWorkExperiencesDto } from './workExperiences.dto';

@ApiTags('Work Experiences') // Группировка маршрутов по тегу "Work Experiences"
@Controller('workExperiences')
export class WorkExperiencesController {
  constructor(private readonly workExperiencesService: WorkExperiencesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить весь опыт работы' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список опыта работы успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.workExperiencesService.workExperienceFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить опыт работы по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Опыт работы успешно получен' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Опыт работы не найден' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID опыта работы' }) // Описание параметра пути
  getWorkExperience(@Param('id', ParseIntPipe) id: number) {
    return this.workExperiencesService.workExperienceGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новый опыт работы' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Опыт работы успешно создан' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateWorkExperiencesDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateWorkExperiencesDto) {
    return this.workExperiencesService.workExperienceCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить опыт работы' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Опыт работы успешно обновлен' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Опыт работы не найден' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID опыта работы' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateWorkExperiencesDto,
  ) {
    return this.workExperiencesService.workExperienceUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить опыт работы' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Опыт работы успешно удален' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Опыт работы не найден' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID опыта работы' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.workExperiencesService.workExperienceDelete(id);
  }
}