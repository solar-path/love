import { z } from 'zod';

export const emailSchema = z
  .string()
  .email()
  .min(1, { message: 'Required field' });
