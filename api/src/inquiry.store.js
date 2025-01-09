// import { db } from 'api/src/database/drizzle';
// import { inquiryTable } from 'api/src/database/schema/crm.drizzle';
// import { inquirySchema } from '../../app/routes/admin/crm/inquiry/inquiry.yup';

// export const getInquiryList = async () => {
//   try {
//     return await db.select().from(inquiryTable);
//   } catch (error) {
//     console.error('Error fetching inquiry list:', error);
//     return [];
//   }
// };

// export const getInquiryById = async (id) => {
//   try {
//     return await db
//       .select()
//       .from(inquiryTable)
//       .where(eq(inquiryTable.id, id))
//       .then((res) => res[0]);
//   } catch (error) {
//     console.error('Error fetching inquiry by id:', error);
//     return null;
//   }
// };

// export const addInquiry = async (data) => {
//   try {
//     const validatedData = inquirySchema.validateSync(data);

//     if (!validatedData) {
//       return null;
//     }

//     const record = await db
//       .insert(inquiryTable)
//       .values({
//         id: crypto.randomUUID(),
//         email: validatedData.email.toLowerCase().trim(),
//         message: validatedData.message.trim(),
//       })
//       .returning()
//       .then((res) => res[0]);

//     return record;
//   } catch (error) {
//     console.error('Error adding inquiry:', error);
//     return null;
//   }
// };

// export const updateInquiry = async (data) => {
//   try {
//     const record = await db
//       .update(inquiryTable)
//       .set({
//         reply: data.reply,
//       })
//       .where(eq(inquiryTable.id, data.id))
//       .returning()
//       .then((res) => res[0]);

//     return record;
//   } catch (error) {
//     console.error('Error updating inquiry:', error);
//     return null;
//   }
// };

// export const deleteInquiry = async (id) => {
//   try {
//     await db.delete(inquiryTable).where(eq(inquiryTable.id, id));
//   } catch (error) {
//     console.error('Error deleting inquiry:', error);
//     return null;
//   }
// };
