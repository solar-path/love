import { Hono } from "hono";
import type { Context } from "@/context";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema, forgotPasswordSchema } from "./auth.zod";
import { forgotPassword, login, register } from "./auth.service";

export const authRouter = new Hono<Context>();

authRouter
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const data = await c.req.valid("json");
    return c.json(await register(data));
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const data = await c.req.valid("json");
    return c.json(await login(data));
  })
  .post(
    "/forgot-password",
    zValidator("json", forgotPasswordSchema),
    async (c) => {
      const data = await c.req.valid("json");
      return c.json(await forgotPassword(data));
    }
  );

export default authRouter;
