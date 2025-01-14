import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { eq, and } from "drizzle-orm";
import type { Register } from "../auth.zod.js";
import {
  companyTable,
  structureTable,
} from "@/database/schema/business.drizzle.js";
import { HTTPException } from "hono/http-exception";

export const register = async (data: Register) => {
  const checkUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email.toLowerCase()))
    .then((res) => res[0]);

  if (checkUser)
    throw new HTTPException(409, {
      message: "User already exists",
    });

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
    const verificationToken = crypto.randomUUID();

    // create user
    const user = await tx
      .insert(userTable)
      .values({
        id: crypto.randomUUID(),
        email: data.email.toLowerCase(),
        password: await Bun.password.hash(data.password),
        verificationToken,
      })
      .returning()
      .then((res) => res[0]);

    //create company
    const company = await tx
      .insert(companyTable)
      .values({
        id: crypto.randomUUID(),
        title: data.company,
        BIN: data.bin,
        industry: data.industry,
        residence: data.residence,
        author: user.id,
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
        employee: user.id,
      })
      .returning()
      .then((res) => res[0]);

    // send email
  });

  return {
    data: data.email,
    success: true,
    message: "User created",
  };
};
