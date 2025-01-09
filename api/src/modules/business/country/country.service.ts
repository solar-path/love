import { Injectable } from '@nestjs/common';
import countryData from './country.data.json';

@Injectable()
export class CountryService {
  async getCountryList() {
    return countryData;
  }

  async getCountryById(id: string) {
    return countryData.find((country) => country.id === id);
  }
}
