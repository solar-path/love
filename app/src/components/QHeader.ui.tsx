import { Button, Dropdown, List, MegaMenu, Navbar } from "flowbite-react";
import { Link } from "wouter-preact";
import { fillDrawer } from "./QDrawer.ui";
import RegisterForm from "@/routes/auth/register.form";
import LoginForm from "@/routes/auth/login.form";
import Logo from "@/assets/logo.png";
import { Phone, ShoppingCart } from "lucide-preact";

export default function QHeader() {
  const serviceItems = [
    {
      name: "Phone book",
      href: "/protected/phonebook",
      icon: Phone,
    },
    {
      name: "Procurement",
      href: "/protected/procurement",
      icon: ShoppingCart,
    },
  ];
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Aneko Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/documentation">
          Documentation
        </Navbar.Link>
        <Navbar.Link as={Link} to="/admin">
          Administation panel
        </Navbar.Link>
        <Navbar.Link as={Link} to="/protected">
          Dashboard
        </Navbar.Link>
        <Navbar.Link as={Link} to="/pricing">
          Pricing
        </Navbar.Link>
        <Navbar.Link>
          <Dropdown label="Services" size="xs" color="dark">
            {serviceItems.map((item) => (
              <Dropdown.Item>
                <Link
                  to={item.href}
                  className="flex items-center justify-start"
                >
                  <item.icon size={16} className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Navbar.Link>

        <Navbar.Link onClick={() => fillDrawer(<RegisterForm />, "Sign up")}>
          <Button size="xs" color="failure">
            Sign up
          </Button>
        </Navbar.Link>
        <Navbar.Link onClick={() => fillDrawer(<LoginForm />, "Sign in")}>
          <Button size="xs" color="dark">
            Sign in
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
