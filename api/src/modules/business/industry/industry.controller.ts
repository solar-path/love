import { Controller, Get, Param } from '@nestjs/common';
import { IndustryService } from './industry.service';

@Controller('country')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Get()
  async getIndustryList() {
    return this.industryService.getIndustryList();
  }

  @Get(':id')
  async getIndustryById(@Param('id') id: string) {
    return this.industryService.getIndustryById(id);
  }
}
