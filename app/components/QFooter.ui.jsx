import { List } from "flowbite-react";
import { Link } from "wouter-preact";
import Inquiry from "@routes/admin/crm/inquiry/inquiry.form";
import { fillDrawer } from "./QDrawer.ui";

export default function QFooter() {
  return (
    <footer className="bg-white rounded-lg m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 Aneko, ltd.
        </span>

        <List
          horizontal
          className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
        >
          <List.Item className="me-4 md:me-6">
            <Link to="/privacy" className="hover:text-red-700">
              Privacy Policy
            </Link>
          </List.Item>

          <List.Item className="me-4 md:me-6">
            <Link to="/terms" className="hover:text-red-700">
              Terms & Conditions
            </Link>
          </List.Item>

          <List.Item className="me-4 md:me-6">
            <button
              onClick={() => fillDrawer("Contact us", <Inquiry />)}
              className="hover:text-red-700"
            >
              Contact Us
            </button>
          </List.Item>
        </List>
      </div>
    </footer>
  );
}
