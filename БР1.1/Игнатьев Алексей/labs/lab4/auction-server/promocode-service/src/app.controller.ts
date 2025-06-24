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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  PromocodeEntity,
  PromocodeResponseEntity,
} from './entities/promocode.entity';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { PromocodesService } from './app.service';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import { PaginateParams } from './params/pagination.params.dto';
import { StatusOKDto } from './dto/status.dto';

@Controller('promocodes')
export class PromocodesController {
  constructor(private readonly promocodesService: PromocodesService) {}

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async create(
    @Body() createPromocodeDto: CreatePromocodeDto,
  ): Promise<PromocodeEntity> {
    return await this.promocodesService.create(createPromocodeDto);
  }

  @Get()
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @ApiResponse({ type: PromocodeResponseEntity })
  async findAll(
    @Query() params: PaginateParams,
  ): Promise<PromocodeResponseEntity> {
    return await this.promocodesService.findAll(params);
  }

  @Get('by-code')
  @ApiResponse({ type: PromocodeEntity })
  async findByCode(
    @Query('code') code: string,
  ): Promise<PromocodeEntity | null> {
    return await this.promocodesService.findByCode(code);
  }

  @Get(':id')
  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @ApiResponse({ type: PromocodeEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PromocodeEntity | null> {
    return await this.promocodesService.findOne(id);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
  ): Promise<PromocodeEntity> {
    return await this.promocodesService.update(id, updatePromocodeDto);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.promocodesService.remove(id);
  }
}
