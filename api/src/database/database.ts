import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as businessSchema from './schema/business.drizzle';
import * as crmSchemaQ from './schema/crm.drizzle';
import * as ermSchemaQ from './schema/erm.drizzle';
import * as soxSchemaQ from './schema/sox.drizzle';
import * as docSchemaQ from './schema/docs.drizzle';
import * as taskSchemaQ from './schema/task.drizzle';
import * as userSchemaQ from './schema/auth.drizzle';

export const db = drizzle(process.env.DATABASE_URL!, {
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
