import { Injectable } from '@nestjs/common';
import { db } from 'src/database/database';
import { generateResponse } from 'src/helpers/generateResponse.helper';
import { inquiryTable } from '../crm.drizzle';
import { findRecordByKey } from 'src/helpers/findRecordByKey.helper';
import { eq } from 'drizzle-orm';
import { CreateInquiryDTO } from './inquiry.zod';

@Injectable()
export class InquiryService {
  async findAllInquiries() {
    const data = await db.select().from(inquiryTable);
    return data
      ? generateResponse({
          data,
          success: true,
          message: 'Inquiries fetched successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Failed to fetch inquiries',
        });
  }

  async findInquiryById(id: string) {
    const record = await findRecordByKey(inquiryTable, 'id', id);
    return record
      ? generateResponse({
          data: record,
          success: true,
          message: 'Inquiry fetched successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Inquiry not found',
        });
  }

  async createInquiry(inquiry: CreateInquiryDTO) {
    const newRecord = await db
      .insert(inquiryTable)
      .values({
        id: crypto.randomUUID(),
        email: inquiry.email,
        message: inquiry.message,
      })
      .returning()
      .then((res) => res[0]);
    return newRecord
      ? generateResponse({
          data: newRecord,
          success: true,
          message: 'Inquiry created successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Failed to create inquiry',
        });
  }

  async updateInquiry(
    id: string,
    inquiry: Partial<{ email: string; message: string }>,
  ) {
    const existingRecord = await findRecordByKey(inquiryTable, 'id', id);

    if (!existingRecord) {
      return generateResponse({
        data: null,
        success: false,
        message: 'Inquiry not found',
      });
    }

    const updatedRecord = await db
      .update(inquiryTable)
      .set({ ...inquiry })
      .where(eq(inquiryTable.id, id))
      .returning()
      .then((res) => res[0]);

    return updatedRecord
      ? generateResponse({
          data: updatedRecord,
          success: true,
          message: 'Inquiry updated successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Failed to update inquiry',
        });
  }

  async deleteInquiry(id: string) {
    const existingRecord = await findRecordByKey(inquiryTable, 'id', id);

    if (!existingRecord) {
      return generateResponse({
        data: null,
        success: false,
        message: 'Inquiry not found',
      });
    }

    const removedRecord = await db
      .delete(inquiryTable)
      .where(eq(inquiryTable.id, id))
      .returning()
      .then((res) => res[0]);

    return removedRecord
      ? generateResponse({
          data: removedRecord,
          success: true,
          message: 'Inquiry deleted successfully',
        })
      : generateResponse({
          data: null,
          success: false,
          message: 'Failed to delete inquiry',
        });
  }
}
