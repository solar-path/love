import { List } from "flowbite-react";
import { Link } from "wouter-preact";

export default function QSideNav({ items }) {
  const renderNavItem = (item) => (
    <li className="list-none" key={item.label}>
      <Link
        href={item.href}
        className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        {item.icon}
        <span className="text-gray-700 dark:text-gray-900">{item.label}</span>
      </Link>
      {item.children && item.children.length > 0 && (
        <List className="ml-6 mt-2">{item.children.map(renderNavItem)}</List>
      )}
    </li>
  );

  return <List>{items.map(renderNavItem)}</List>;
}
