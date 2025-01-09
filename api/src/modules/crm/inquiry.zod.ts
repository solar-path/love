import { z } from "zod";

export const inquirySchema = z.object({
  email: z.string().email().min(1, { message: "Required field" }),
  message: z.string().min(1, { message: "Required field" }),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export const idSchema = z.object({
  id: z.string().uuid().min(1, { message: "Required field" }),
});

export type Id = z.infer<typeof idSchema>;
