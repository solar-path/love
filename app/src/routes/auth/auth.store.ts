import { client } from "@/main";
import { signal } from "@preact/signals";

export const currentUser = signal({
  id: null,
  email: null,
  fullname: null,
  avatar: null,
});

export const isAuthenticated = signal(false);

export const logout = async () => {
  await client.auth.logout.$get();
  currentUser.value = {
    id: null,
    fullname: null,
    email: null,
    avatar: null,
  };
  isAuthenticated.value = false;
};

export const setCurrentUser = (user: any) => {
  currentUser.value = user;
};
