import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { findRecordByKey } from "@/helper/findRecordByKey.helper.js";
import bcrypt from "bcryptjs";

export const register = async (user: { email: string; password: string }) => {
    const record = await findRecordByKey(userTable, 'email', user.email);

    if (record) return {
        data: null,
        success: false,
        message: 'User already exists',
    };

    db.transaction(async (tx) => {
        const verificationToken = crypto.randomUUID();

        // create user 
        await tx.insert(userTable).values({
            id: crypto.randomUUID(),
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
            verificationToken,
        });
    })

}

export const login = async (user: { email: string; password: string }) => {
  const record = await findRecordByKey(userTable, "email", user.email);

  if (!record) return {
    data: null,
    success: false,
    message: 'User not found',
  };

  const isPasswordValid = await bcrypt.compare(user.password, record.password);

  if (!isPasswordValid)
    return {
      data: null,
      success: false,
      message: "Invalid password",
    };

  return {
    data: record,
    success: true,
    message: "Login successful",
  };
};

export const forgotPassword = async (user: { email: string }) => {
  const record = await findRecordByKey(userTable, "email", user.email);

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
