import { Controller } from '@nestjs/common';
import { OrgchartService } from './orgchart.service';

@Controller('company')
export class OrgchartController {
  constructor(private readonly orgchartService: OrgchartService) {}
}
