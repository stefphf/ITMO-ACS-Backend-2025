import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewEntity, ReviewResponseEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { MediaType, PrismaClient } from '@prisma/client';
import { StorageService } from 'src/config/s3/s3.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ReviewsService extends CommonService<ReviewEntity> {
  constructor(
    private readonly s3Service: StorageService,
    protected readonly prisma: PrismaClient,
  ) {
    super(prisma);
  }

  async findAll(params: PaginateParams): Promise<ReviewResponseEntity> {
    const { skip, take } = params;
    const reviews = await this.prisma.review.findMany({
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
            instagram: true,
            language: true,
          },
        },
        auction: {
          select: { auction_id: true, end_price: true, title: true },
        },
        media: true,
      },
    });
    return {
      items: reviews.map((review) => ({
        ...review,
        media: review.media.map((m) => ({
          ...m,
          media_type: m.media_type as MediaType,
        })),
      })),
      total_items: reviews.length,
    };
  }

  async createReview(
    dto: CreateReviewDto,
    userId: number,
    files: Express.Multer.File[] | undefined,
  ): Promise<ReviewEntity> {
    const media: { url: string; media_type: MediaType }[] = [];
    if (files) {
      for (const file of files) {
        const mimetype = file.mimetype;
        let mediaType: MediaType | null = null;
        if (mimetype.startsWith('image/')) {
          mediaType = MediaType.PHOTO;
        } else if (mimetype.startsWith('video/')) {
          mediaType = MediaType.VIDEO;
        } else {
          continue;
        }

        const item = await this.s3Service.uploadFile(file);
        media.push({
          url: item,
          media_type: mediaType,
        });
      }
    }

    return this.prisma.$transaction(async (prisma) => {
      const auction = await prisma.auction.findUnique({
        where: { auction_id: dto.auction_id },
        include: { winner: true },
      });

      const existingReview = await this.prisma.review.findUnique({
        where: { auction_id: dto.auction_id },
      });

      if (existingReview) {
        throw new BadRequestException(
          'You have already submitter a review fot this auction',
        );
      }

      if (!auction) throw new NotFoundException('Auction not found');
      if (auction.state !== 'REVIEW')
        throw new BadRequestException('Auction is not in review state');
      if (auction.winner_id !== userId)
        throw new ForbiddenException('Only the winner can leave a review');

      // Создаем отзыв
      const review = await prisma.review.create({
        data: {
          auction_id: dto.auction_id,
          user_id: userId,
          comment: dto.comment,
          media: {
            createMany: {
              data: media.map((m) => {
                return {
                  url: m.url,
                  media_type: m.media_type,
                };
              }),
            },
          },
        },
        include: {
          user: {
            select: {
              user_id: true,
              username: true,
              first_name: true,
              last_name: true,
              avatar_url: true,
              instagram: true,
              language: true,
            },
          },
          auction: {
            select: { auction_id: true, end_price: true, title: true },
          },
          media: true,
        },
      });

      return review;
    });
  }
}
