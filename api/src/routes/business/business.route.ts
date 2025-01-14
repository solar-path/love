import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { idSchema } from "../crm/inquiry.zod";
import { getIndustryList, getIndustryById } from "./services/industry.service";
import { getCountryList, getCountryById } from "./services/country.service";
import type { Context } from "@/context";
import { loggedIn } from "@/middleware/loggedIn";
import { getPhoneBookByCompanyId } from "./services/phoneBook/getPhoneBookByCompanyId.service";
import { paginationSchema } from "@/helper/pagination.zod";
import { createCompany } from "./services/company/createCompany.service";
import { companySchema } from "./services/company/company.zod";

export const businessRouter = new Hono<Context>()
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
  })
  .get(
    "/phonebook",
    loggedIn,
    zValidator("query", paginationSchema),
    async (c) => {
      // const { limit, page, sortBy, order, author, site } = c.req.valid("query");
      const user = c.get("user");
      console.log("business/business.route.ts :: user => ", user);
      // const data = await c.req.valid("query");
      return c.json(await getPhoneBookByCompanyId());
    }
  )
  .post("/company", loggedIn, zValidator("json", companySchema), async (c) => {
    const data = await c.req.valid("json");
    console.log("business/business.route.ts :: data => ", data);
    // return c.json({ message: "Company data received", data });

    return c.json(await createCompany(data));
  });

export default businessRouter;
