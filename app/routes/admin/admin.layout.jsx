import { Inbox, House } from "lucide-preact";
import QSideNav from "@components/QSideNav.ui";

export default function AdminLayout({ children }) {
  const items = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <House size={16} className="text-gray-700" />,
      children: [],
    },
    {
      label: "CRM",
      href: "/admin/crm",
      icon: <Inbox size={16} className="text-gray-700" />,
      children: [
        {
          label: "Inquiry",
          href: "/admin/crm/inquiry",
          icon: <Inbox size={16} className="text-gray-700" />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="w-1/4">
        <QSideNav items={items} />
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
}
