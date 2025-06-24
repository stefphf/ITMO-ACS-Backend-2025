import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateWinItemDto } from './dto/create-win-item.dto';
import { UpdateWinItemDto } from './dto/update-win-item.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FortuneWinsService } from './fortune-wins.service';
import { BasicJwtCombineGuard } from 'src/common/guards/basic-jwt-combine.guard';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { FortuneWinEntity, FortuneWinResponseEntity } from './entities/fortune-win.entity';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { commonControllerFactory } from 'src/common/common.controller-default';

const CommonController = commonControllerFactory<FortuneWinEntity>({
  entity: FortuneWinEntity,
});

@Controller('fortune-wins')
export class FortuneWinsController extends CommonController {
  constructor(private readonly fortuneService: FortuneWinsService) {
    super(fortuneService);
  }

  @ApiBearerAuth('Bearer')
  @ApiBearerAuth('Basic')
  @Get()
  @ApiQuery({ name: 'user_id', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @UseGuards(BasicJwtCombineGuard)
  async findAll(
    @Query() params: PaginateParams,
    @Request() req: { user?: JwtUserPayloadDto; admin?: boolean },
    @Query('user_id') userId?: string,
  ): Promise<FortuneWinResponseEntity> {
    const isAdmin = req?.admin || false;

    if (isAdmin) {
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }
      const parsedUserId = parseInt(userId, 10);
      if (isNaN(parsedUserId)) {
        throw new BadRequestException('User ID must be a number');
      }
      return this.fortuneService.findAll(params, parsedUserId);
    }

    if (req.user?.id) {
      return this.fortuneService.findAll(params, req.user.id);
    }

    throw new BadRequestException('Invalid auth');
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Post()
  async create(@Body() createWinItemDto: CreateWinItemDto) {
    return this.fortuneService.create(createWinItemDto);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWinItemDto: UpdateWinItemDto,
  ): Promise<FortuneWinEntity> {
    return this.fortuneService.update(id, updateWinItemDto);
  }

  @ApiBearerAuth('Basic')
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<StatusOKDto> {
    return this.fortuneService.remove(id);
  }
}
