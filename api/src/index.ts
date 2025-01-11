import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import type { ErrorResponse } from "./helper/types";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { lucia } from "./lucia";
import { cors } from "hono/cors";
import type { Context } from "./context";
import authRouter from "./routes/auth/auth.route";
import businessRouter from "./routes/business/business.route";

const app = new Hono<Context>();

app.use("*", cors(), async (c, next) => {
  const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });
  }
  if (!session) {
    c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
      append: true,
    });
  }
  c.set("session", session);
  c.set("user", user);
  return next();
});

// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });

app.use(prettyJSON()).use(logger());

const routes = app
  .basePath("/api")
  .route("/auth", authRouter)
  .route("/business", businessRouter);

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

export default app;

export type ApiRoutes = typeof routes;
