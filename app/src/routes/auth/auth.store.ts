import { client } from "@/main";
import { signal } from "@preact/signals";

export const currentUser = signal({
  fullname: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  session: "123",
});

export const isAuthenticated = signal(true);

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
