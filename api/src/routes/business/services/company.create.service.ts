import { db } from "@/database/database";
import {
  companyTable,
  structureTable,
} from "@/database/schema/business.drizzle";
import { eq, and } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import type { Company } from "./company.zod";

export const createCompany = async (data: Company) => {
  const checkCompany = await db
    .select()
    .from(companyTable)
    .where(
      and(
        eq(companyTable.BIN, data.bin),
        eq(companyTable.title, data.company),
        eq(companyTable.residence, data.residence)
      )
    )
    .then((res) => res[0]);

  if (checkCompany)
    throw new HTTPException(409, {
      message: "Company already exists",
    });

  db.transaction(async (tx) => {
    //create company
    const company = await tx
      .insert(companyTable)
      .values({
        id: crypto.randomUUID(),
        title: data.company,
        BIN: data.bin,
        industry: data.industry,
        residence: data.residence,
        author: data.id,
        companySlug: data.company.toLowerCase().replace(/ /g, "-"),
      })
      .returning()
      .then((res) => res[0]);

    // create structure
    await tx
      .insert(structureTable)
      .values({
        id: crypto.randomUUID(),
        company: company.id,
        employee: data.id,
      })
      .returning()
      .then((res) => res[0]);

    // send email
  });

  return data;
};
