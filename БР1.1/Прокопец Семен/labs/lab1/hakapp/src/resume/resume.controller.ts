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
import { ResumeService } from './resume.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateResumesDto, TUpdateResumesDto } from './resume.dto';

@ApiTags('Resumes') // Группировка маршрутов по тегу "Resumes"
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumesService: ResumeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все резюме' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список резюме успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.resumesService.resumeFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить резюме по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Резюме успешно получено' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Резюме не найдено' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID резюме' }) // Описание параметра пути
  getResume(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.resumeGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())

  @ApiOperation({ summary: 'Создать новое резюме' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Резюме успешно создано' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateResumesDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateResumesDto) {
    return this.resumesService.resumeCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить резюме' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Резюме успешно обновлено' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Резюме не найдено' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID резюме' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateResumesDto,
  ) {
    return this.resumesService.resumeUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить резюме' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Резюме успешно удалено' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Резюме не найдено' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID резюме' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.resumesService.resumeDelete(id);
  }
}