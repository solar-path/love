import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as businessSchema from "./schema/business.drizzle";
import * as crmSchemaQ from "./schema/crm.drizzle";
import * as ermSchemaQ from "./schema/erm.drizzle";
import * as soxSchemaQ from "./schema/sox.drizzle";
import * as docSchemaQ from "./schema/docs.drizzle";
import * as taskSchemaQ from "./schema/task.drizzle";
import * as userSchemaQ from "./schema/auth.drizzle";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log("Database URL exists:", !!url);
console.log("Auth Token exists:", !!authToken);

const turso = createClient({
  url: url!,
  authToken: authToken!,
});

export const db = drizzle(turso, {
  schema: {
    ...businessSchema,
    ...crmSchemaQ,
    ...ermSchemaQ,
    ...soxSchemaQ,
    ...docSchemaQ,
    ...taskSchemaQ,
    ...userSchemaQ,
  },
});
