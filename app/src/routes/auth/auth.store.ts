import { client } from "@/main";
import { signal } from "@preact/signals";
import { fillToast } from "@/components/QToast.ui";
import { companyList, currentCompany } from "@/routes/company/company.store";
import type { Login, Register } from "@api/src/routes/auth/auth.zod";
import { closeDrawer, fillDrawer } from "@/components/QDrawer.ui";
import LoginForm from "./login.form";
export const currentUser = signal({
  id: null,
  email: null,
  fullname: null,
  avatar: null,
});

export const isAuthenticated = signal(false);

export const logout = async (onSuccess: () => void) => {
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
  // navigate("/");
  onSuccess?.();
};

export const setCurrentUser = (user: any) => {
  currentUser.value = user;
};

export const login = async (data: Login, onSuccess: () => void) => {
  client.auth.login
    .$post({ json: data })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.success === true) {
        // set current user
        setCurrentUser(resData.data.user);
        // set authenticated
        isAuthenticated.value = true;
        // set company list
        companyList.value = resData.data.companyList;
        // set current company
        currentCompany.value = resData.data.companyList[0];
        // close drawer
        closeDrawer();
        // navigate to company
        // navigate("/company");
        onSuccess?.();
      }
      if (resData.success === false) {
        fillToast("error", resData.error);
      }
    })
    .catch((error) => {
      console.log("app :: login.form.ui :: error => ", error);
    });
};

export const signUp = async (data: Register) => {
  console.log("app :: auth.store :: register :: data => ", data);
  client.auth.register
    .$post({ json: data })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.success === true) {
        fillToast("success", "Registration successful. Activate your account.");
        fillDrawer(LoginForm, "Sign in");
      }
      if (resData.success === false) {
        fillToast("error", resData.message);
      }
    })
    .catch((error) => {
      console.log("app :: login.form.ui :: error => ", error);
    });
  // client.auth.register.$post({ json: data }).then((res) => res.json());
};
