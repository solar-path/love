import { Module } from '@nestjs/common';
import { CountryController } from './country/country.controller';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { CountryService } from './country/country.service';
import { IndustryController } from './industry/industry.controller';
import { OrgchartController } from './orgchart/orgchart.controller';
import { IndustryService } from './industry/industry.service';
import { OrgchartService } from './orgchart/orgchart.service';

@Module({
  controllers: [
    CompanyController,
    CountryController,
    IndustryController,
    OrgchartController,
  ],
  providers: [CompanyService, CountryService, IndustryService, OrgchartService],
})
export class BusinessModule {}
