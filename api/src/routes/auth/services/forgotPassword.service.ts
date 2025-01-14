import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { eq } from "drizzle-orm";
import type { ForgotPassword } from "../auth.zod.js";

import { HTTPException } from "hono/http-exception";

export const forgotPassword = async (data: ForgotPassword) => {
  const record = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email))
    .then((res) => res[0]);

  if (!record)
    throw new HTTPException(409, {
      message: "Invalid credentials",
    });

  // send email with record.verificationToken

  return {
    data: null,
    success: true,
    message: "Email sent",
  };
};
