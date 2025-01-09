import { db } from "@/database/database.js";
import { Table } from "drizzle-orm";

import { eq } from "drizzle-orm";

export const findRecordByKey = async (
  table: Table,
  key: string,
  value: string
) => {
  return await db
    .select()
    .from(table)
    .where(eq(table[key], value))
    .then((res) => res[0]);
};
