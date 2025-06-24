import { Module } from '@nestjs/common';
import { IpApiService } from './ip-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [IpApiService],
  exports: [IpApiService],
})
export class IpApiModule {}
