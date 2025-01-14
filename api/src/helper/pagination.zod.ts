import { z } from "zod";

export const sortBySchema = z.enum(["recent"]);
export const orderSchema = z.enum(["asc", "desc"]);

export const paginationSchema = z.object({
  limit: z.number({ coerce: true }).optional().default(20),
  page: z.number({ coerce: true }).optional().default(1),
  sortBy: sortBySchema.optional().default("recent"),
  order: orderSchema.optional().default("desc"),
  author: z.optional(z.string()),
  site: z.string().optional(),
});
