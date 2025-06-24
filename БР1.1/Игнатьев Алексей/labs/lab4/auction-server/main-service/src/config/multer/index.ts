import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class MulterConfig implements MulterOptionsFactory {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      endpoint: this.configService.get<string>(
        'MINIO_ENDPOINT',
        'http://localhost:9000',
      ),
      region: 'ru-1',
      credentials: {
        accessKeyId: this.configService.get<string>(
          'MINIO_ACCESS_KEY',
          'minioadmin',
        ),

        secretAccessKey: this.configService.get<string>(
          'MINIO_SECRET_KEY',
          'minioadmin',
        ),
      },
      forcePathStyle: true,
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3({
        s3: this.s3,
        bucket: this.configService.get<string>('MINIO_BUCKET', 'my-bucket'),
        acl: 'public-read', // Можно изменить на 'private'
        key: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, key?: string) => void,
        ) => {
          try {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          } catch (error) {
            cb(error as Error);
          }
        },
      }),
    };
  }
}
