export class CountryDto {
  country: string;
  country_code: string;
}

export class CityDto {
  city: string;
  state: string;
  zip: string;
}

export class StreetDto {
  type: string;
  properties: {
    country: string;
    country_code: string;
    region: string;
    state: string;
    county: string;
    postcode: string;
    street: string;
    iso3166_2: string;
    datasource: {
      sourcename: string;
      attribution: string;
      license: string;
      url: string;
    };
    lon: number;
    lat: number;
    result_type: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    timezone: {
      name: string;
      offset_STD: string;
      offset_STD_seconds: number;
      offset_DST: string;
      offset_DST_seconds: number;
      abbreviation_STD: string;
      abbreviation_DST: string;
    };
    plus_code: string;
    rank: {
      confidence: number;
      confidence_city_level: number;
      confidence_street_level: number;
      match_type: string;
    };
    place_id: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
  bbox: number[];
}
