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
import { BonusesService } from './app.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { BonusEntity } from './entities/bonus.entity';
import { BonusResponseEntity } from './entities/bonus.entity';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import { PaginateParams } from './params/pagination.params.dto';
import { StatusOKDto } from './dto/status.dto';

@Controller('bonuses')
export class BonusesController {
  constructor(private readonly bonusesService: BonusesService) {}

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async create(@Body() createBonusDto: CreateBonusDto): Promise<BonusEntity> {
    return await this.bonusesService.create(createBonusDto);
  }

  @Get()
  @ApiResponse({ type: BonusResponseEntity })
  async findAll(@Query() params: PaginateParams): Promise<BonusResponseEntity> {
    return await this.bonusesService.findAll(params);
  }

  @Get(':id')
  @ApiResponse({ type: BonusEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BonusEntity | null> {
    return await this.bonusesService.findOne(id);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBonusDto: UpdateBonusDto,
  ): Promise<BonusEntity> {
    return await this.bonusesService.update(id, updateBonusDto);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<StatusOKDto> {
    return await this.bonusesService.remove(id);
  }
}
