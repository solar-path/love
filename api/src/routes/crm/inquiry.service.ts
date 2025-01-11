import { db } from "@/database/database.js";
import { inquiryTable } from "@/database/schema/crm.drizzle.js";
import { eq } from "drizzle-orm";
import type { Inquiry, ReplyToInquiry } from "./inquiry.zod.js";

export const getInquiryList = async () => {
  return await db.select().from(inquiryTable);
};

export const getInquiryById = async (id: string) => {
  return await db.select().from(inquiryTable).where(eq(inquiryTable.id, id));
};

export const createInquiry = async (inquiry: Inquiry) => {
  console.log(inquiry);
  return await db
    .insert(inquiryTable)
    .values({
      id: crypto.randomUUID(),
      ...inquiry,
    })
    .returning()
    .then((res) => res[0]);
};

export const updateInquiry = async (
  id: string,
  replyToInquiry: ReplyToInquiry
) => {
  return await db
    .update(inquiryTable)
    .set(replyToInquiry)
    .where(eq(inquiryTable.id, id));
};
