import { Controller, Get, Query } from '@nestjs/common';
import { GeoService } from './geo.service';
import { CityDto, CountryDto, StreetDto } from './dto/geo.dto';

@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get('/countries')
  async getGeo(@Query('country') country: string): Promise<CountryDto[]> {
    return this.geoService.getCountries(country);
  }

  @Get('/cities')
  async getCity(
    @Query('countryCode') countryCode: string,
    @Query('city') city: string,
  ): Promise<CityDto[]> {
    return this.geoService.getCities(countryCode, city);
  }

  @Get('/streets')
  async getStreet(
    @Query('countryCode') countryCode: string,
    @Query('city') city: string,
    @Query('street') street: string,
  ): Promise<StreetDto[]> {
    return this.geoService.getStreets(countryCode, city, street);
  }
}
