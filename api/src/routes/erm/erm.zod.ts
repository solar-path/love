import { z } from "zod";

export const riskOutcomeSchema = z.array(
  z.object({
    id: z.string().uuid().min(1, { message: "Requied field" }),
    title: z.string().min(1, { message: "Requied field" }),
    description: z.string().optional(),
  })
);

export type RiskOutcome = z.infer<typeof riskOutcomeSchema>;

export const factorSchema = z.array(
  z.object({
    id: z.string().uuid().min(1, { message: "Requied field" }),
    title: z.string().min(1, { message: "Requied field" }),
    description: z.string().optional(),
  })
);

export type Factor = z.infer<typeof factorSchema>;

export const riskSchema = z.object({
  id: z.string().uuid().min(1, { message: "Requied field" }),
  title: z.string().min(1, { message: "Requied field" }),
  description: z.string().min(1, { message: "Requied field" }),
  factor: factorSchema,
  outcome: riskOutcomeSchema,
  riskOwner: z.string().uuid().min(1, { message: "Requied field" }),
  author: z.string().uuid().min(1, { message: "Requied field" }),
  company: z.string().min(1, { message: "Required field" }),
});

export type Risk = z.infer<typeof riskSchema>;

export const createRiskSchema = z.object({
  risk: riskSchema.extend({
    id: z.string().uuid().optional(), // Make id optional
  }),
});

export type CreateRisk = z.infer<typeof createRiskSchema>;
