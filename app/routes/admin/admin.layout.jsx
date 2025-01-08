import { Inbox } from "lucide-preact";
import QSideNav from "app/components/QSideNav";

export default function AdminLayout({ children }) {
  const items = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <Home />,
      children: [],
    },
    {
      label: "CRM",
      href: "/admin/crm",
      icon: <Inbox />,
      children: [
        {
          label: "Inquiry",
          href: "/admin/crm/inquiry",
          icon: <Inbox />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="w-1/4">
        <h1>Admin</h1>
        <QSideNav items={items} />
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
}
