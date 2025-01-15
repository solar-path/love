import { Hono } from "hono";
import type { Context } from "@/context";
import { getRiskRegisterByCompanyId } from "./services/risk/getRiskRegisterByCompanyId.service";
import { loggedIn } from "@/middleware/loggedIn";
import { zValidator } from "@hono/zod-validator";
import { idSchema } from "../crm/inquiry.zod";
import { createRiskSchema } from "./erm.zod";
import { createRisk } from "./services/risk/createRisk.service";

export const ermRouter = new Hono<Context>()
  .get("/risk-register", loggedIn, zValidator("param", idSchema), async (c) => {
    const companyId = c.req.valid("param").id;
    return c.json(await getRiskRegisterByCompanyId(companyId));
  })
  .post("/risk", loggedIn, zValidator("json", createRiskSchema), async (c) => {
    const risk = await c.req.valid("json");
    return c.json(await createRisk(risk));
  });

export default ermRouter;
