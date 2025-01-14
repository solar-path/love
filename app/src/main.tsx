import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import { hc } from "hono/client";
import type { ApiRoutes } from "@api/src";
import { currentUser, isAuthenticated } from "./routes/auth/auth.store.ts";
import { companyList, currentCompany } from "./routes/company/company.store.ts";

// Hono client customised fetch to include credentials (cookies & session)
export const client = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, { ...init, credentials: "include" }),
}).api;

client.auth.user
  .$get()
  .then((res) => res.json())
  .then((resData) => {
    console.log("main.ts :: resData => ", resData);
    if (resData.success) {
      currentUser.value = {
        id: resData.data.id,
        email: resData.data.email,
        fullname: resData.data.fullname,
        avatar: resData.data.avatar,
      };
      isAuthenticated.value = true;
      companyList.value = resData.data.companyList;
      currentCompany.value = resData.data.companyList[0];
    }
  })
  .catch((err) => {
    console.log("main.ts :: err => ", err);
  });

render(<App />, document.getElementById("app")!);
