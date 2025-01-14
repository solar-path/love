import { client } from "@/main";
import { signal } from "@preact/signals";
import { companyList } from "../company/company.store";
import { currentCompany } from "../company/company.store";
import { navigate } from "wouter-preact/use-hash-location";

export const currentUser = signal({
  id: null,
  email: null,
  fullname: null,
  avatar: null,
});

export const isAuthenticated = signal(false);

export const logout = async () => {
  await client.auth.logout.$get();
  // clean user data
  currentUser.value = {
    id: null,
    fullname: null,
    email: null,
    avatar: null,
  };
  // clean company data
  currentCompany.value = null;
  // clean company list
  companyList.value = [];
  // set authenticated to false
  isAuthenticated.value = false;
  // navigate to home
  navigate("/");
};

export const setCurrentUser = (user: any) => {
  currentUser.value = user;
};
