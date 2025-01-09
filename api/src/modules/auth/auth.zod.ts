import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, { message: "Required field" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      }),
    passwordConfirm: z.string().min(1, { message: "Required field" }),
    residence: z.string().min(1, { message: "Required field" }),
    residenceId: z.string().optional(),
    industry: z.string().min(1, { message: "Required field" }),
    industryId: z.string().optional(),
    company: z.string().min(1, { message: "Required field" }),
    bin: z.string().min(1, { message: "Required field" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms of use",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
