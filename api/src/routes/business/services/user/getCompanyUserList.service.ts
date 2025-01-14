import { db } from "@/database/database";
import { structureTable } from "@/database/schema/business.drizzle";
import { eq } from "drizzle-orm";

export const getCompanyUserList = async (companyId: string) => {
  return await db.query.structureTable.findMany({
    where: eq(structureTable.company, companyId),
    columns: { id: true },
    with: {
      company: { columns: { id: true, title: true } },
      employee: {
        columns: {
          id: true,
          avatar: true,
          fullname: true,
          email: true,
          emailVerified: true,
          createdAt: true,
          gender: true,
          dob: true,
        },
      },
      department: { columns: { id: true, title: true } },
      position: { columns: { id: true, title: true } },
    },
  });
};
