import { z } from "zod";

// export const companySchema = z.object({
export const companyCreateEditSchema = z.object({
  id: z.string().optional(),
  residence: z.string().min(1, { message: "Required field" }),
  residenceId: z.string().optional(),
  industry: z.string().min(1, { message: "Required field" }),
  industryId: z.string().optional(),
  title: z.string().min(1, { message: "Required field" }),
  bin: z.string().min(1, { message: "Required field" }),
  author: z.string().min(1, { message: "Required field" }),
});

export type CompanyCreateEdit = z.infer<typeof companyCreateEditSchema>;

export const companyForFrontendSchema = companyCreateEditSchema.extend({
  id: z.string(),
  companySlug: z.string(),
  title: z.string(),
});

export type CompanyForFrontend = z.infer<typeof companyForFrontendSchema>;
