import { z } from 'zod';

export const messageSchema = z.string().min(1, { message: 'Required field' });
