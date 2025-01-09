import 'dotenv/config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import * as businessSchema from './schema/business.drizzle.js';
import * as crmSchemaQ from './schema/crm.drizzle.js';
import * as ermSchemaQ from './schema/erm.drizzle.js';
import * as soxSchemaQ from './schema/sox.drizzle.js';
import * as docSchemaQ from './schema/docs.drizzle.js';
import * as taskSchemaQ from './schema/task.drizzle.js';
import * as userSchemaQ from './schema/auth.drizzle.js';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN!,
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
