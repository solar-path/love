import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import business from "./modules/business/business.module.js";
import crm from "./modules/crm/crm.module.js";
import auth from "./modules/auth/auth.module.js";
import { HTTPException } from "hono/http-exception";
import type { ErrorResponse } from "./helper/types.js";
const app = new Hono();

app
  .use(prettyJSON())
  .use(logger())
  .route("/auth", auth)
  .route("/business", business)
  .route("/crm", crm)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json<ErrorResponse>(
        {
          success: false,
          error: err.message,
          isFormError:
            err.cause && typeof err.cause === "object" && "form" in err.cause
              ? err.cause.form === true
              : false,
        },
        err.status
      );
    return errResponse;
  }
  return c.json<ErrorResponse>(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.stack ?? err.message,
    },
    500
  );
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
