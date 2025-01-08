import { useState } from "preact/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "wouter-preact";
import { Label, TextInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import Register from "./register.form";
import ForgotPassword from "./forgot.form";
import { Mail, Lock, Eye, EyeOff } from "lucide-preact";
import { fillDrawer } from "@components/QDrawer.ui";
// Define a schema for login validation
const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"), // Example password validation
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [, setLocation] = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col w-full space-y-2"
    >
      <h2 className="text-lg font-semibold">Welcome Back!</h2>
      <p className="text-sm text-gray-600">
        Please enter your credentials to log in to your account.
      </p>
      <div>
        <Label htmlFor="email" value="Email" />
        <TextInput
          type="email"
          icon={Mail}
          {...register("email")}
          color={errors.email ? "failure" : "gray"}
          helperText={errors.email ? errors.email.message : ""}
        />
      </div>
      <div>
        <Label htmlFor="password" value="Password" />
        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            icon={Lock}
            color={errors.password ? "failure" : "gray"}
            helperText={errors.password ? errors.password.message : ""}
            {...register("password")}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>
      <Button type="submit" color="dark">
        Login
      </Button>
      <ul>
        <li>
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-red-500"
              onClick={() => fillDrawer(Register, "Sign up")}
            >
              Sign up
            </button>
          </p>
        </li>
        <li>
          <p className="text-sm">
            Forgot password?{" "}
            <button
              type="button"
              className="text-red-500"
              onClick={() => fillDrawer(ForgotPassword, "Forgot password")}
            >
              Remind
            </button>
          </p>
        </li>
      </ul>
    </form>
  );
}
