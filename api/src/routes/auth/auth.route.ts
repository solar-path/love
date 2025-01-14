import { Hono } from "hono";
import type { Context } from "@/context";
import { zValidator } from "@hono/zod-validator";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./auth.zod";
import { register } from "./services/register.service";
import { login } from "./services/login.service";
import { forgotPassword } from "./services/forgotPassword.service";
import { resetPassword } from "./services/resetPassword.service";

import type { SuccessResponse } from "@/helper/types";
import { lucia } from "@/lucia";
import { loggedIn } from "@/middleware/loggedIn";

export const authRouter = new Hono<Context>()
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const data = await c.req.valid("json");
    return c.json(await register(data));
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const data = await c.req.valid("json");
    const { sessionCookie, companyList } = await login(data);

    c.header("Set-Cookie", sessionCookie, {
      append: true,
    });

    console.log(
      "auth/services/login.service.ts :: companyList =>",
      companyList
    );

    return c.json<SuccessResponse<{ companyList: typeof companyList }>>(
      {
        success: true,
        message: "Login successful",
        data: { companyList },
      },
      201
    );
  })
  .post(
    "/forgot-password",
    zValidator("json", forgotPasswordSchema),
    async (c) => {
      const data = await c.req.valid("json");
      return c.json(await forgotPassword(data));
    }
  )
  .post(
    "/reset-password",
    zValidator("json", resetPasswordSchema),
    async (c) => {
      const data = await c.req.valid("json");
      return c.json(await resetPassword(data));
    }
  )
  .get("/logout", async (c) => {
    // .get("/logout", loggedIn, async (c) => {
    const session = c.get("session");
    if (!session) {
      return c.redirect("/");
    }

    await lucia.invalidateSession(session.id);
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
    return c.redirect("/");
  })
  .get("/user", loggedIn, async (c) => {
    const user = c.get("user")!;
    return c.json<
      SuccessResponse<{ email: string; fullname: string; avatar: string }>
    >({
      success: true,
      message: "User fetched successfully",
      data: {
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
      },
    });
  });

export default authRouter;
