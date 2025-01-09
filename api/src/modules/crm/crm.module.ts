import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { idSchema, inquirySchema } from "./inquiry.zod.js";
import {
  getInquiryList,
  getInquiryById,
  createInquiry,
  updateInquiry,
} from "./inquiry.service.js";

const crm = new Hono();

crm
  .get("/inquiry", async (c) => {
    return c.json(await getInquiryList());
  })
  .get("/inquiry/:id", zValidator("param", idSchema), async (c) => {
    return c.json(await getInquiryById(c.req.param("id")));
  })
  .post("/inquiry", zValidator("json", inquirySchema), async (c) => {
    const inquiry = await c.req.valid("json");
    return c.json(await createInquiry(inquiry));
  })
  .put("/inquiry/:id", async (c) => {
    const replyToInquiry = await c.req.json();
    return c.json(await updateInquiry(c.req.param("id"), replyToInquiry));
  });

export default crm;
