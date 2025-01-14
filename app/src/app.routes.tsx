import { Switch, Route } from "wouter-preact";
import Home from "@/routes/public/home.page";
import Pricing from "@/routes/public/pricing.page";
import Docs from "@/routes/public/documentation/docs.page";
import Privacy from "@/routes/public/privacy.page";
import Terms from "@/routes/public/terms.page";
import DocsLayout from "@/routes/public/documentation/docs.layouts";
import AdminLayout from "@/routes/admin/admin.layout";
import AdminPage from "@/routes/admin/admin.page";
import NotFound from "@/routes/public/NotFound.page";
import CrmPage from "@/routes/admin/crm/crm.page";
import InquiryPage from "@/routes/admin/crm/inquiry/inquiry.page";
import AddressBookPage from "@/routes/admin/crm/addressBook/addressBook.page";
import ProtectedLayout from "./routes/company/company.layout";
import DashboardPage from "./routes/company/company.page";
import ErmPage from "./routes/company/erm/erm.page";
import RiskPage from "./routes/company/erm/risk/risk.page";
import OrgChartPage from "./routes/company/orgchart/orgchart.page";
import OrgChartUnitPage from "./routes/company/orgchart/unit/orgchartUnit.page";
import UserPage from "./routes/company/user/user.page";
import PhoneBookPage from "./routes/company/phoneBook/phoneBook.page";
import ProcurementPage from "./routes/company/procurement/procurement.page";
import CompanyLayout from "./routes/company/company.layout";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/admin" nest>
        <AdminLayout>
          <Switch>
            <Route path="/" component={AdminPage} />
            <Route path="/crm" component={CrmPage} />
            <Route path="/crm/inquiry" component={InquiryPage} />
            <Route path="/crm/addressBook" component={AddressBookPage} />
          </Switch>
        </AdminLayout>
      </Route>

      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />

      <Route path="/documentation" nest>
        <DocsLayout>
          <Switch>
            <Route path="/:page?" component={Docs} />
          </Switch>
        </DocsLayout>
      </Route>

      <Route path="/company" nest>
        <CompanyLayout>
          <Switch>
            <Route path="/" component={DashboardPage} />
            <Route path="/erm" component={ErmPage} />
            <Route path="/erm/risk" component={RiskPage} />
            <Route path="/orgchart" component={OrgChartPage} />
            <Route path="/orgchart/unit" component={OrgChartUnitPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/phoneBook" component={PhoneBookPage} />
            <Route path="/procurement" component={ProcurementPage} />
          </Switch>
        </CompanyLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}
