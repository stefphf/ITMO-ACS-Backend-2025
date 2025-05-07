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
import { ApplicationService } from './application.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateApplicationsDto, TUpdateApplicationsDto } from './application.dto';

@ApiTags('Application') // Группировка маршрутов по тегу "Application"
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationsService: ApplicationService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все заявки' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список заявок успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.applicationsService.applicationFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заявку по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Заявка успешно получена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Заявка не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' }) // Описание параметра пути
  getApplication(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.applicationGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую заявку' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Заявка успешно создана' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateApplicationsDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateApplicationsDto) {
    return this.applicationsService.applicationCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить заявку' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Заявка успешно обновлена' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Заявка не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateApplicationsDto,
  ) {
    return this.applicationsService.applicationUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить заявку' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Заявка успешно удалена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Заявка не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID заявки' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.applicationDelete(id);
  }
}