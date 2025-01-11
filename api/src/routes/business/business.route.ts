import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { idSchema } from "../crm/inquiry.zod.js";
import { getIndustryList, getIndustryById } from "./industry.service.js";
import { getCountryList, getCountryById } from "./country.service.js";
import type { Context } from "@/context.js";

const businessRouter = new Hono<Context>();

businessRouter
  .get("/industry", async (c) => {
    return c.json(await getIndustryList());
  })
  .get("/industry/:id", zValidator("param", idSchema), async (c) => {
    return c.json(await getIndustryById(c.req.param("id")));
  })
  .get("/country", async (c) => {
    return c.json(await getCountryList());
  })
  .get("/country/:id", zValidator("param", idSchema), async (c) => {
    return c.json(await getCountryById(c.req.param("id")));
  });

export default businessRouter;
