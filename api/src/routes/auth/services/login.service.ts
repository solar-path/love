import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { eq } from "drizzle-orm";
import type { Login } from "../auth.zod.js";
import { lucia } from "@/lucia.js";
import { HTTPException } from "hono/http-exception";
import { getCompanyListByUserId } from "@/routes/business/services/company/getCompanyListByUserId.js";

export const login = async (data: Login) => {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email))
    .limit(1)
    .then((res) => res[0]);

  if (!user)
    throw new HTTPException(409, {
      message: "Invalid credentials",
    });

  const isPasswordValid = await Bun.password.verify(
    data.password,
    user.password
  );

  if (!isPasswordValid)
    throw new HTTPException(409, {
      message: "Invalid credentials",
    });

  if (!user.emailVerified)
    throw new HTTPException(409, {
      message: "Account is not verified",
    });

  // get company list in which user is employee
  const companyList = await getCompanyListByUserId(user.id);

  // generate cookie session
  const session = await lucia.createSession(user.id, {
    user: {
      email: user.email,
      fullName: user.fullname,
    },
  });

  const sessionCookie = lucia.createSessionCookie(session.id).serialize();
  return {
    sessionCookie,
    companyList,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullname,
      avatar: user.avatar,
    },
  };
};
