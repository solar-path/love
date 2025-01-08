import "./app.css";
import QHeader from "./components/QHeader.ui";
import QDrawer from "./components/QDrawer.ui";
import QFooter from "./components/QFooter.ui";
import { Switch, Route } from "wouter-preact";
import Home from "./routes/public/home.page";
import Pricing from "./routes/public/pricing.page";
import Docs from "./routes/public/documentation/docs.page";
import Privacy from "./routes/public/privacy.page";
import Terms from "./routes/public/terms.page";
import DocsLayout from "./routes/public/documentation/docs.layouts";
export function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <QHeader />
      <QDrawer />
      <main className="flex-grow pl-10 pr-10 pr-10">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>

          <Route path="/documentation">
            <DocsLayout>
              <Docs />
            </DocsLayout>
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
        </Switch>
      </main>
      <QFooter />
    </div>
  );
}
