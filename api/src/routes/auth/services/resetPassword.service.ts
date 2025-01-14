import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { eq } from "drizzle-orm";
import type { ResetPassword } from "../auth.zod.js";
import { HTTPException } from "hono/http-exception";

export const resetPassword = async (data: ResetPassword) => {
  const { token, password } = data;
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.verificationToken, token))
    .then((res) => res[0]);

  if (!user)
    throw new HTTPException(409, {
      message: "Invalid credentials",
    });

  await db
    .update(userTable)
    .set({
      password: await Bun.password.hash(password),
      // update verification token for future verification
      verificationToken: crypto.randomUUID(),
    })
    .where(eq(userTable.id, user.id));

  return {
    data: null,
    success: true,
    message: "Password reset successful",
  };
};
