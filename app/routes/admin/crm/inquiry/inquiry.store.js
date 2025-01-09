import { db } from "@database/drizzle";
import { inquiryTable } from "@database/schema/crm.drizzle";

export const getInquiryList = async () => {
  try {
    return await db.select().from(inquiryTable);
  } catch (error) {
    console.error("Error fetching inquiry list:", error);
    return null;
  }
};

export const addInquiry = async (data) => {
  try {
    const record = await db
      .insert(inquiryTable)
      .values({
        id: crypto.randomUUID(),
        email: data.email.toLowerCase().trim(),
        message: data.message.trim(),
      })
      .returning()
      .then((res) => res[0]);

    return record;
  } catch (error) {
    console.error("Error adding inquiry:", error);
    return null;
  }
};

export const updateInquiry = async (data) => {
  try {
    const record = await db
      .update(inquiryTable)
      .set({
        reply: data.reply,
      })
      .where(eq(inquiryTable.id, data.id))
      .returning()
      .then((res) => res[0]);

    return record;
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return null;
  }
};

export const deleteInquiry = async (id) => {
  try {
    await db.delete(inquiryTable).where(eq(inquiryTable.id, id));
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return null;
  }
};
