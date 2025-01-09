import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  getCountryList,
  getCountryById,
} from "./modules/business/country.service.js";
import {
  getIndustryList,
  getIndustryById,
} from "./modules/business/industry.service.js";
import {
  getInquiryList,
  getInquiryById,
  createInquiry,
  updateInquiry,
} from "./modules/crm/inquiry.service.js";

const app = new Hono();

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/industry", async (c) => {
    return c.json(await getIndustryList());
  })
  .get("/industry/:id", async (c) => {
    return c.json(await getIndustryById(c.req.param("id")));
  })
  .get("/country", async (c) => {
    return c.json(await getCountryList());
  })
  .get("/country/:id", async (c) => {
    return c.json(await getCountryById(c.req.param("id")));
  })
  .get("/inquiry", async (c) => {
    return c.json(await getInquiryList());
  })
  .get("/inquiry/:id", async (c) => {
    return c.json(await getInquiryById(c.req.param("id")));
  })
  .post("/inquiry", async (c) => {
    const inquiry = await c.req.json();
    return c.json(await createInquiry(inquiry));
  })
  .put("/inquiry/:id", async (c) => {
    const inquiry = await c.req.json();
    return c.json(await updateInquiry(c.req.param("id"), inquiry));
  });

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
