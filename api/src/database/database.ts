import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as businessSchema from "./schema/business.drizzle.js";
import * as crmSchemaQ from "./schema/crm.drizzle.js";
import * as ermSchemaQ from "./schema/erm.drizzle.js";
import * as soxSchemaQ from "./schema/sox.drizzle.js";
import * as docSchemaQ from "./schema/docs.drizzle.js";
import * as taskSchemaQ from "./schema/task.drizzle.js";
import * as userSchemaQ from "./schema/auth.drizzle.js";

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
