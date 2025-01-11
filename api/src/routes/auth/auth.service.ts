import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { eq, and } from "drizzle-orm";
import type {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
} from "./auth.zod.js";
import {
  companyTable,
  structureTable,
} from "@/database/schema/business.drizzle.js";
import { lucia } from "@/lucia.js";
import { HTTPException } from "hono/http-exception";

export const register = async (data: Register) => {
  const checkUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email.toLowerCase()))
    .then((res) => res[0]);

  if (checkUser)
    throw new HTTPException(409, {
      message: "User already exists",
    });

  const checkCompany = await db
    .select()
    .from(companyTable)
    .where(
      and(
        eq(companyTable.BIN, data.bin),
        eq(companyTable.title, data.company),
        eq(companyTable.residence, data.residence)
      )
    )
    .then((res) => res[0]);

  if (checkCompany)
    throw new HTTPException(409, {
      message: "Company already exists",
    });

  db.transaction(async (tx) => {
    const verificationToken = crypto.randomUUID();

    // create user
    const user = await tx
      .insert(userTable)
      .values({
        id: crypto.randomUUID(),
        email: data.email.toLowerCase(),
        password: await Bun.password.hash(data.password),
        verificationToken,
      })
      .returning()
      .then((res) => res[0]);

    //create company
    const company = await tx
      .insert(companyTable)
      .values({
        id: crypto.randomUUID(),
        title: data.company,
        BIN: data.bin,
        industry: data.industry,
        residence: data.residence,
        author: user.id,
        companySlug: data.company.toLowerCase().replace(/ /g, "-"),
      })
      .returning()
      .then((res) => res[0]);

    // create structure
    await tx
      .insert(structureTable)
      .values({
        id: crypto.randomUUID(),
        company: company.id,
        employee: user.id,
      })
      .returning()
      .then((res) => res[0]);

    // send email
  });

  return {
    data: data.email,
    success: true,
    message: "User created",
  };
};

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

  const session = await lucia.createSession(user.id, {
    user: {
      email: user.email,
      fullName: user.fullname,
    },
  });

  const sessionCookie = lucia.createSessionCookie(session.id).serialize();
  return { sessionCookie };
};

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
