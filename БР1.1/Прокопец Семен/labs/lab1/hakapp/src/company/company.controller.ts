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
import { CompanyService } from './company.service';
import { ParseIntPipe } from '../conception/pipe';
import { CreateCompanysDto, TUpdateCompanysDto } from './company.dto';

@ApiTags('Company') // Группировка маршрутов по тегу "Company"
@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все компании' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Список компаний успешно получен' }) // Описание успешного ответа
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  findAll() {
    return this.companysService.companyFindAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компанию по ID' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Компания успешно получена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Компания не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID компании' }) // Описание параметра пути
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.companyGetById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создать новую компанию' }) // Описание операции
  @ApiResponse({ status: 201, description: 'Компания успешно создана' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiBody({ type: CreateCompanysDto }) // Описание тела запроса
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  create(@Body() dto: CreateCompanysDto) {
    return this.companysService.companyCreate(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Обновить компанию' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Компания успешно обновлена' }) // Описание успешного ответа
  @ApiResponse({ status: 400, description: 'Неверные данные' }) // Описание ошибки
  @ApiResponse({ status: 404, description: 'Компания не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID компании' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: TUpdateCompanysDto,
  ) {
    return this.companysService.companyUpdate(id, dto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Удалить компанию' }) // Описание операции
  @ApiResponse({ status: 200, description: 'Компания успешно удалена' }) // Описание успешного ответа
  @ApiResponse({ status: 404, description: 'Компания не найдена' }) // Описание ошибки
  @ApiParam({ name: 'id', type: 'number', description: 'ID компании' }) // Описание параметра пути
  @ApiBearerAuth() // Указываем, что маршрут требует JWT
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.companyDelete(id);
  }
}