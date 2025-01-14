import { structureTable } from "@/database/schema/business.drizzle";

import { companyTable } from "@/database/schema/business.drizzle";
import { db } from "@/database/database";
import { eq } from "drizzle-orm";

export const getCompanyListByUserId = async (id: string) => {
  return await db
    .selectDistinct({
      id: companyTable.id,
      title: companyTable.title,
      companySlug: companyTable.companySlug,
    })
    .from(structureTable)
    .where(eq(structureTable.employee, id))
    .innerJoin(companyTable, eq(companyTable.id, structureTable.company));
};
