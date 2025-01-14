import { Button, Dropdown, Avatar, Navbar } from "flowbite-react";
import { Link, useLocation } from "wouter-preact";
import { fillDrawer } from "./QDrawer.ui";
import RegisterForm from "@/routes/auth/register.form";
import LoginForm from "@/routes/auth/login.form";
import Logo from "@/assets/logo.png";
import { Phone, ShoppingCart } from "lucide-preact";
import { currentUser, logout } from "@/routes/auth/auth.store";
import { isAuthenticated } from "@/routes/auth/auth.store";
import QCompanySelector from "./QCompanySelector.ui";

export default function QHeader() {
  const [, setLocation] = useLocation();
  const serviceItems = [
    {
      name: "Phone book",
      href: "/company/phonebook",
      icon: Phone,
    },
    {
      name: "Procurement",
      href: "/company/procurement",
      icon: ShoppingCart,
    },
  ];

  if (!isAuthenticated.value) {
    return (
      <Navbar fluid rounded className="flex items-center justify-between">
        <Navbar.Brand as={Link} to="/" className="flex items-center">
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Aneko Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="flex items-center gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <Navbar.Link as={Link} to="/documentation">
              Documentation
            </Navbar.Link>
            <Navbar.Link as={Link} to="/pricing">
              Pricing
            </Navbar.Link>
            <Navbar.Link
              onClick={() => fillDrawer(RegisterForm, "Sign up")}
              className="text-red-700 font-bold text-lg"
            >
              Sign up
            </Navbar.Link>
            <Navbar.Link onClick={() => fillDrawer(LoginForm, "Sign in")}>
              <Button size="sm" color="dark">
                Sign in
              </Button>
            </Navbar.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar fluid rounded className="flex items-center justify-between">
        <Navbar.Brand className="flex items-center">
          <QCompanySelector />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="flex items-center gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <Navbar.Link as={Link} to="/documentation">
              Documentation
            </Navbar.Link>
            <Navbar.Link as={Link} to="/admin">
              Administation panel
            </Navbar.Link>
            <Navbar.Link as={Link} to="/company">
              Dashboard
            </Navbar.Link>

            <Navbar.Link>
              <Dropdown label="Services" color="dark">
                {serviceItems.map((item) => (
                  <Dropdown.Item>
                    <Link to={item.href} className="flex items-center">
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
              >
                <Dropdown.Header>
                  <span className="block text-sm">
                    {currentUser.value
                      ? currentUser.value.fullname
                      : "Anonymous"}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser.value ? currentUser.value.email : "Anonymous"}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link href="/company/profile">Profile</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => logout(() => setLocation("/"))}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </Navbar.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
