import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewEntity, ReviewResponseEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtUserPayloadDto } from 'src/auth/dto/jwt.dto';
import { ApiBearerAuth, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { commonControllerFactory } from 'src/common/common.controller-default';

const CommonController = commonControllerFactory<ReviewEntity>({
  entity: ReviewEntity,
});

@Controller('reviews')
export class ReviewsController extends CommonController {
  constructor(private readonly reviewsService: ReviewsService) {
    super(reviewsService);
  }

  @Get()
  @ApiResponse({ type: ReviewResponseEntity })
  async findAll(
    @Query() params: PaginateParams,
  ): Promise<ReviewResponseEntity> {
    return await this.reviewsService.findAll(params);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media', 10))
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req: { user: JwtUserPayloadDto },
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return await this.reviewsService.createReview(
      createReviewDto,
      req.user.id,
      files,
    );
  }
}
