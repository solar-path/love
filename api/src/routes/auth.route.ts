import { Hono } from "hono";
import type { Context } from "@/context";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema, forgotPasswordSchema } from "./auth.zod";
import { forgotPassword, login, register } from "./auth.service";
import type { SuccessResponse } from "@/helper/types";
import { lucia } from "@/lucia";

export const authRouter = new Hono<Context>()
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const data = await c.req.valid("json");
    return c.json(await register(data));
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const data = await c.req.valid("json");
    const { sessionCookie } = await login(data);

    c.header("Set-Cookie", sessionCookie, {
      append: true,
    });

    return c.json<SuccessResponse>(
      {
        success: true,
        message: "Login successful",
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
  .get("/logout", async (c) => {
    const session = c.get("session");
    if (!session) {
      return c.redirect("/");
    }

    await lucia.invalidateSession(session.id);
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
    return c.redirect("/");
  })
  .get("/user");

export default authRouter;
