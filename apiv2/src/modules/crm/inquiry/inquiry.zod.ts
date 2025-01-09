import { emailSchema } from '@/zod/email.zod';
import { messageSchema } from '@/zod/message.zod';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createInquirySchema = z.object({
  email: emailSchema,
  message: messageSchema,
});

export class CreateInquiryDTO extends createZodDto(createInquirySchema) {}
