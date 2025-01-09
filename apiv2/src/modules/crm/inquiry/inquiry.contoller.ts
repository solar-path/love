import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDTO } from './inquiry.zod';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('crm/inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Public()
  @Get()
  async findAll() {
    return this.inquiryService.findAllInquiries();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inquiryService.findInquiryById(id);
  }

  @Public()
  @Post()
  @UsePipes(ZodValidationPipe)
  async create(@Body() inquiry: CreateInquiryDTO) {
    return this.inquiryService.createInquiry(inquiry);
  }

  @Public()
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() inquiry: CreateInquiryDTO) {
    return this.inquiryService.updateInquiry(id, inquiry);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.inquiryService.deleteInquiry(id);
  }
}
