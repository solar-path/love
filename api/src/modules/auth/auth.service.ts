import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import type { Register, Login, ForgotPassword } from "./auth.zod.js";
import {
  companyTable,
  structureTable,
} from "@/database/schema/business.drizzle.js";
import jwt from "jsonwebtoken";

export const register = async (data: Register) => {
  const record = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email))
    .then((res) => res[0]);

  if (record)
    return {
      data: null,
      success: false,
      message: "User already exists",
    };

  db.transaction(async (tx) => {
    const verificationToken = crypto.randomUUID();

    // create user
    const user = await tx
      .insert(userTable)
      .values({
        id: crypto.randomUUID(),
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
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
    const structure = await tx
      .insert(structureTable)
      .values({
        id: crypto.randomUUID(),
        company: company.id,
        employee: user.id,
      })
      .returning()
      .then((res) => res[0]);
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
    .then((res) => res[0]);

  if (!user)
    return {
      data: null,
      success: false,
      message: "Invalid credentials",
    };

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid)
    return {
      data: null,
      success: false,
      message: "Invalid credentials",
    };

  if (!user.emailVerified)
    return {
      data: null,
      success: false,
      message: "Account is not verified",
    };

  const token = await jwt.sign(
    {
      email: user.email,
      id: user.verificationToken,
    },
    process.env.JWT_SECRET as string
  );

  const { password, ...userData } = user;

  return {
    data: {
      token,
      user: userData,
    },
    success: true,
    message: "Login successful",
  };
};

export const forgotPassword = async (data: ForgotPassword) => {
  const record = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, data.email))
    .then((res) => res[0]);

  if (!record)
    return {
      data: null,
      success: false,
      message: "User not found",
    };

  // send email logic

  return {
    data: null,
    success: true,
    message: "Email sent",
  };
};
