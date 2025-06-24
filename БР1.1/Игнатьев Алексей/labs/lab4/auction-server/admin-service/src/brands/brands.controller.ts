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
import { BrandEntity, BrandResponseEntity } from './entities/brand.entity';
import { PaginateParams } from 'src/params/pagination.params.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { StatusOKDto } from 'src/dto/status.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/guards/basic-auth.guard';
import { BrandsService } from './brands.service';

@Controller('admin/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async create(@Body() createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    return await this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiResponse({ type: BrandResponseEntity })
  async findAll(@Query() params: PaginateParams): Promise<BrandResponseEntity> {
    return await this.brandsService.findAll(params);
  }

  @Get(':id')
  @ApiResponse({ type: BrandEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BrandEntity | null> {
    return await this.brandsService.findOne(id);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandEntity> {
    return await this.brandsService.update(id, updateBrandDto);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.brandsService.remove(id);
  }
}
