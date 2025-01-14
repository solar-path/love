// import { Route, Redirect } from "wouter-preact";
// import { fillDrawer } from "@/components/QDrawer.ui";
// import Login from "@/routes/auth/login.form";
// import { currentUser, isAuthenticated } from "@/routes/auth/auth.store";

// export function ProtectedRoute({ component, ...rest }: any) {
//   console.log("protected.guards.tsx :: currentUser => ", currentUser.value);
//   if (currentUser.value === null && !isAuthenticated.value) {
//     fillDrawer(Login, "Sign in");
//     return <Redirect to="/" replace />;
//   }

//   return <Route {...rest} component={component} />;
// }

import { Redirect } from "wouter-preact";
import { fillDrawer } from "@/components/QDrawer.ui";
import LoginForm from "@/routes/auth/login.form";
import { currentUser, isAuthenticated } from "@/routes/auth/auth.store";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (currentUser.value === null || !isAuthenticated.value) {
    fillDrawer(<LoginForm />, "Sign in");
    return <Redirect to="/" replace />;
  }

  return <>{children}</>;
}
