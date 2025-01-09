import { Switch, Route } from "wouter-preact";
import Home from "./routes/public/home.page";
import Pricing from "./routes/public/pricing.page";
import Docs from "./routes/public/documentation/docs.page";
import Privacy from "./routes/public/privacy.page";
import Terms from "./routes/public/terms.page";
import DocsLayout from "./routes/public/documentation/docs.layouts";
import AdminLayout from "@routes/admin/admin.layout";
import AdminPage from "@routes/admin/admin.page";
import NotFound from "@routes/public/NotFound.page";
import CrmPage from "@routes/admin/crm/crm.page";
import InquiryPage from "@routes/admin/crm/inquiry/inquiry.page";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/admin">
        <AdminLayout>
          <AdminPage />
          <Route path="/admin/crm" component={CrmPage} />
          <Route path="/admin/crm/inquiry" component={InquiryPage} />
        </AdminLayout>
      </Route>

      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />

      <Route path="/documentation">
        <DocsLayout>
          <Docs />
        </DocsLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}
