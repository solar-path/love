import { Controller, Get, Param } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { Public } from '@/decorators/public.decorator';

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Public()
  @Get()
  async getIndustryList() {
    return this.industryService.getIndustryList();
  }

  @Public()
  @Get(':id')
  async getIndustryById(@Param('id') id: string) {
    return this.industryService.getIndustryById(id);
  }
}
