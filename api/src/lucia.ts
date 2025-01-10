import { Lucia } from "lucia";
import { adapter } from "./database/database";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (att) => {
    return {
      email: att.email,
      fullname: att.fullname,
      avatar: att.avatar,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: { email: string; fullname: string; avatar: string };
  }
}
