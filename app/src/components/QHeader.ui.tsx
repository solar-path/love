import { Button, Dropdown, Avatar, Navbar } from "flowbite-react";
import { Link } from "wouter-preact";
import { fillDrawer } from "./QDrawer.ui";
import RegisterForm from "@/routes/auth/register.form";
import LoginForm from "@/routes/auth/login.form";
import Logo from "@/assets/logo.png";
import { Phone, ShoppingCart } from "lucide-preact";
import { currentUser, logout } from "@/routes/auth/auth.store";
import { isAuthenticated } from "@/routes/auth/auth.store";

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

  if (!isAuthenticated.value) {
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

          <Navbar.Link as={Link} to="/pricing">
            Pricing
          </Navbar.Link>

          <Navbar.Link
            onClick={() => fillDrawer(<RegisterForm />, "Sign up")}
            className="text-red-700 font-bold text-lg"
          >
            Sign up
          </Navbar.Link>
          <Navbar.Link onClick={() => fillDrawer(<LoginForm />, "Sign in")}>
            <Button size="sm" color="dark">
              Sign in
            </Button>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar fluid rounded>
        <Navbar.Brand>company selector</Navbar.Brand>
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

          <Navbar.Link>
            <Dropdown label="Services" color="dark">
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

          <Navbar.Link>
            <Dropdown
              label={
                currentUser.value?.avatar ? (
                  <Avatar
                    alt="User settings"
                    img={currentUser.value.avatar}
                    rounded
                  />
                ) : (
                  <Avatar alt="User settings" rounded />
                )
              }
              arrowIcon={false}
              inline
              className="w-auto"
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {currentUser.value.fullname}
                </span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.value.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href="/company/profile">Profile</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => logout()}>Sign out</Dropdown.Item>
            </Dropdown>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
