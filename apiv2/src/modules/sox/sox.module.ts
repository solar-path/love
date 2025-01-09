import { Module } from '@nestjs/common';
import { ProcessService } from './process/process.service';
import { ProcessController } from './process/process.controller';

@Module({
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class SoxModule {}
