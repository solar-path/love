import { client } from "@/main";
import { signal } from "@preact/signals";

export const currentUser = signal({
  fullname: "",
  email: "",
  avatar: "",
  session: "",
});

export const isAuthenticated = signal(false);

export const logout = async () => {
  await client.auth.logout.$get();
  currentUser.value = {
    fullname: "",
    email: "",
    avatar: "",
    session: "",
  };
  isAuthenticated.value = false;
};
