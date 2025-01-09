import "./app.css";
import QHeader from "./components/QHeader.ui";
import QDrawer from "./components/QDrawer.ui";
import QFooter from "./components/QFooter.ui";
import AppRoutes from "./app.routes";

export function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <QHeader />
      <QDrawer />
      <main className="flex-grow pl-10 pr-10">
        <AppRoutes />
      </main>
      <QFooter />
    </div>
  );
}
