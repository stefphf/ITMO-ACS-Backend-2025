import { Injectable } from '@nestjs/common';
import { IpInfoDto } from './dto/ip-api.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IpApiService {

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getIpDetails(ip: string): Promise<IpInfoDto | null> {
    const apiKey = this.configService.get<string>('IP_API_KEY'); // Replace with your actual API key
    const url = `https://pro.ip-api.com/json/${ip}?fields=status,countryCode,regionName,city,zip,lat,lon,isp,mobile,proxy,hosting&key=${apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
