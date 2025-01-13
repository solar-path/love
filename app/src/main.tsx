import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import { hc } from "hono/client";
import type { ApiRoutes } from "@api/src";

export const client = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, { ...init, credentials: "include" }),
}).api;

// export const client = hc<ApiRoutes>("/").api;

render(<App />, document.getElementById("app")!);
