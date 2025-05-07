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
import { VacancyService } from './vacancy.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateVacancysDto, TUpdateVacancysDto } from './vacancy.dto';

@ApiTags('Vacancies') // Группировка маршрутов по тегу "Vacancies"
@Controller('vacancys')
export class VacancyController {
  constructor(private readonly vacancysService: VacancyService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все вакансии' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список вакансий успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.vacancysService.vacancyFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить вакансию по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Вакансия успешно получена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID вакансии' }) // Описание параметра пути
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.vacancysService.vacancyGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую вакансию' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Вакансия успешно создана' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateVacancysDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateVacancysDto) {
    return this.vacancysService.vacancyCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить вакансию' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Вакансия успешно обновлена' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID вакансии' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateVacancysDto,
  ) {
    return this.vacancysService.vacancyUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить вакансию' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Вакансия успешно удалена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Вакансия не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID вакансии' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vacancysService.userDelete(id);
  }
}