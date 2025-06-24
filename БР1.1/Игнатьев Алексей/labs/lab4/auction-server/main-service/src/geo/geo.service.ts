import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeoService {
  API_KEY = this.configService.get('GEO_API_KEY');
  GEO_URL = `https://api.geoapify.com/v1/geocode/autocomplete?lang=ru&apiKey=${this.API_KEY}`;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCountries(country: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.GEO_URL}&text=${country}&type=country`),
      );
      const res: any[] = [];
      response.data.features.forEach((feature) => {
        res.push({
          country: feature.properties.country,
          country_code: feature.properties.country_code,
          type: feature.properties.type,
        });
      });
      return res;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getCities(countryCode: string, city: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.GEO_URL}&text=${city}&type=city&filter=countrycode:${countryCode}`,
        ),
      );
      const res: any[] = [];
      response.data.features.forEach((feature) => {
        res.push({
          city: feature.properties.city,
          state: feature.properties.state,
          zip: feature.properties.postcode,
        });
      });
      return res;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getStreets(countryCode: string, city: string, street: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.GEO_URL}&text=${city} ${street}&type=street&filter=countrycode:${countryCode}`,
        ),
      );
      return response.data.features;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
