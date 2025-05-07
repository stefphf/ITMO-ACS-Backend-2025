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
import { EducationService } from './education.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateEducationsDto, TUpdateEducationsDto } from './education.dto';

@ApiTags('Education') // Группировка маршрутов по тегу "Education"
@Controller('educations')
export class EducationController {
  constructor(private readonly educationsService: EducationService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все записи об образовании' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список записей об образовании успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.educationsService.educationFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить запись об образовании по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Запись об образовании успешно получена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Запись об образовании не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID записи об образовании' }) // Описание параметра пути
  getEducation(@Param('id', ParseIntPipe) id: number) {
    return this.educationsService.educationGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую запись об образовании' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Запись об образовании успешно создана' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateEducationsDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateEducationsDto) {
    return this.educationsService.educationCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить запись об образовании' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Запись об образовании успешно обновлена' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Запись об образовании не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID записи об образовании' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateEducationsDto,
  ) {
    return this.educationsService.educationUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить запись об образовании' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Запись об образовании успешно удалена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Запись об образовании не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID записи об образовании' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.educationsService.educationDelete(id);
  }
}