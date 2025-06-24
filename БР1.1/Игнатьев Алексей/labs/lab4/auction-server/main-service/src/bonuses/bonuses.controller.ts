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
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { BonusesService } from './bonuses.service';
import { BonusEntity, BonusResponseEntity } from './entities/bonus.entity';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { commonControllerFactory } from 'src/common/common.controller-default';

const CommonController = commonControllerFactory<BonusEntity>({
  entity: BonusEntity,
});

@Controller('bonuses')
export class BonusesController extends CommonController {
  constructor(private readonly bonusesService: BonusesService) {
    super(bonusesService);
  }

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
