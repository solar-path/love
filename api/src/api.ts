import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import business from "./modules/business/business.module.js";
import crm from "./modules/crm/crm.module.js";

const app = new Hono();

app
  .use(prettyJSON())
  .use(logger())
  .route("/business", business)
  .route("/crm", crm)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
