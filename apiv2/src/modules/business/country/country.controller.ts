import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { Public } from '@/decorators/public.decorator';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @Get()
  async getCountryList() {
    return this.countryService.getCountryList();
  }

  @Public()
  @Get(':id')
  async getCountryById(@Param('id') id: string) {
    return this.countryService.getCountryById(id);
  }
}
