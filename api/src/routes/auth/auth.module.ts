import { Hono } from "hono";
import { forgotPassword, login, register } from "./auth.service.js";
import { zValidator } from "@hono/zod-validator";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "./auth.zod.js";
import type { Context } from "@/context.js";

const authRoutes = new Hono<Context>();

authRoutes
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
export default authRoutes;
