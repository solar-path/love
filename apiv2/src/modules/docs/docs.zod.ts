import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { idSchema } from '@/zod/id.zod';

export const findDocsSchema = z.object({
  id: idSchema,
});

export class FindDocsDTO extends createZodDto(findDocsSchema) {}
