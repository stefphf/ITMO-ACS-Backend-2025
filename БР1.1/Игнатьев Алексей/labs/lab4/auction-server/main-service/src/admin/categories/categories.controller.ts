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
import { commonControllerFactory } from 'src/common/common.controller-default';
import { StatusOKDto } from 'src/common/dto/status.dto';
import {
  CategoryEntity,
  CategoryResponseEntity,
} from 'src/auctions/entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { PaginateParams } from 'src/common/params/pagination.params.dto';

const CommonController = commonControllerFactory<CategoryEntity>({
  entity: CategoryEntity,
});

@Controller('admin/categories')
export class CategoriesController extends CommonController {
  constructor(private categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ type: CategoryResponseEntity })
  async findAll(
    @Query() params: PaginateParams,
  ): Promise<CategoryResponseEntity> {
    return await this.categoriesService.findAll(params);
  }

  @Get(':id')
  @ApiResponse({ type: CategoryEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryEntity | null> {
    return await this.categoriesService.findOne(id);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.categoriesService.remove(id);
  }
}
