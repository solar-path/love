import { Lucia } from "lucia";

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
