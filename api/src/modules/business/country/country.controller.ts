import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountryList() {
    return this.countryService.getCountryList();
  }

  @Get(':id')
  async getCountryById(@Param('id') id: string) {
    return this.countryService.getCountryById(id);
  }
}
