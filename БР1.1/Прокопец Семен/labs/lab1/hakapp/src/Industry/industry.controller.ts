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
import { IndustryService } from './industry.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateIndustrysDto, TUpdateIndustrysDto } from './industry.dto';

@ApiTags('Industry') // Группировка маршрутов по тегу "Industry"
@Controller('industry')
export class IndustryController {
  constructor(private readonly industrysService: IndustryService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все отрасли' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список отраслей успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.industrysService.industryFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить отрасль по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Отрасль успешно получена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Отрасль не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID отрасли' }) // Описание параметра пути
  getIndustry(@Param('id', ParseIntPipe) id: number) {
    return this.industrysService.industryGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую отрасль' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Отрасль успешно создана' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateIndustrysDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateIndustrysDto) {
    return this.industrysService.industryCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить отрасль' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Отрасль успешно обновлена' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Отрасль не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID отрасли' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateIndustrysDto,
  ) {
    return this.industrysService.industryUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить отрасль' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Отрасль успешно удалена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Отрасль не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID отрасли' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.industrysService.industryDelete(id);
  }
}