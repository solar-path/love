import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry/inquiry.contoller';
import { InquiryService } from './inquiry/inquiry.service';

@Module({
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class CrmModule {}
