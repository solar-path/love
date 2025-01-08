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
      <main className="flex-grow pl-10 pr-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pricing" component={Pricing} />

          <Route path="/documentation/:path*">
            <DocsLayout>
              <Docs />
            </DocsLayout>
          </Route>
          <Route path="/documentation">
            <DocsLayout>
              <Docs />
            </DocsLayout>
          </Route>
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
        </Switch>
      </main>
      <QFooter />
    </div>
  );
}
