import { db } from "@/database/database";
import { riskTable } from "@/database/schema/erm.drizzle";
import type { CreateRisk } from "@/routes/erm/erm.zod";

export const createRisk = async (risk: CreateRisk) => {
  return await db
    .insert(riskTable)
    .values({ ...risk.risk, id: crypto.randomUUID() })
    .returning()
    .then(([risk]) => risk);
};
