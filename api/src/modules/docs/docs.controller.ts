import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Public()
  @Get()
  async findAll() {
    return this.docsService.postList();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.docsService.postDetail(id);
  }
}
