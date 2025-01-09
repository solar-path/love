import { Injectable } from '@nestjs/common';
import industryData from './industry.data.json';

@Injectable()
export class IndustryService {
  async getIndustryList() {
    return industryData
      .filter(
        (industry) => industry.description !== '' && industry.parent !== null,
      )
      .map((industry) => ({
        id: industry.id,
        title: industry.title,
        description: industry.description,
      }));
  }

  async getIndustryById(id: string) {
    return industryData.find((industry) => industry.id === id);
  }
}
