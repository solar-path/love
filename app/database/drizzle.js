import { drizzle } from "drizzle-orm/libsql";
import { turso } from "./turso";

import * as authTableQ from "./schema/auth.drizzle";
import * as businessTableQ from "./schema/business.drizzle";
import * as crmTableQ from "./schema/crm.drizzle";
import * as ermTableQ from "./schema/erm.drizzle";
import * as soxTableQ from "./schema/sox.drizzle";
import * as taskTableQ from "./schema/task.drizzle";
import * as docsTableQ from "./schema/docs.drizzle";
import * as rbacTableQ from "./schema/rbac.drizzle";

export const db = drizzle(turso, {
  schema: {
    ...authTableQ,
    ...businessTableQ,
    ...crmTableQ,
    ...ermTableQ,
    ...soxTableQ,
    ...taskTableQ,
    ...docsTableQ,
    ...rbacTableQ,
  },
});
