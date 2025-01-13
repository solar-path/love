import { Navbar } from "flowbite-react";
import { Link } from "wouter-preact";
import { fillDrawer } from "./QDrawer.ui";
import RegisterForm from "@/routes/auth/register.form";
import LoginForm from "@/routes/auth/login.form";
import Logo from "@/assets/logo.png";

export default function QHeader() {
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
        <Navbar.Link as={Link} to="/pricing">
          Pricing
        </Navbar.Link>
        <Navbar.Link onClick={() => fillDrawer(<RegisterForm />, "Sign up")}>
          Sign up
        </Navbar.Link>
        <Navbar.Link onClick={() => fillDrawer(<LoginForm />, "Sign in")}>
          Sign in
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
