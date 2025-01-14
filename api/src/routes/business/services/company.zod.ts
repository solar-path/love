import { z } from "zod";

export const companySchema = z.object({
  residence: z.string().min(1, { message: "Required field" }),
  residenceId: z.string().optional(),
  industry: z.string().min(1, { message: "Required field" }),
  industryId: z.string().optional(),
  title: z.string().min(1, { message: "Required field" }),
  bin: z.string().min(1, { message: "Required field" }),
  author: z.string().min(1, { message: "Required field" }),
});

export type Company = z.infer<typeof companySchema>;
