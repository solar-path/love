import QSideNav from "@/components/QSideNav.ui";
import { Building2, House, ShieldAlert, TriangleAlert } from "lucide-preact";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = [
    {
      label: "Dashboard",
      href: "/",
      icon: <House size={16} className="text-gray-700" />,
      children: [],
    },
    {
      label: "ERM",
      href: "/erm",
      icon: <TriangleAlert size={16} className="text-gray-700" />,
      children: [
        {
          label: "Risk",
          href: "/erm/risk",
          icon: <ShieldAlert size={16} className="text-gray-700" />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="w-1/5 flex flex-col justify-between border-r">
        <QSideNav items={items} />
      </div>
      <div className="w-4/5">{children}</div>
    </div>
  );
}
