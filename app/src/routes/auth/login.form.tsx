import { useState } from "preact/hooks";
import { useLocation } from "wouter-preact";
import { Label, TextInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import RegisterForm from "./register.form";
import { Mail, Lock, Eye, EyeOff } from "lucide-preact";
import { fillDrawer } from "@/components/QDrawer.ui";
import ForgotPasswordForm from "./forgot.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type Login } from "@api/src/routes/auth/auth.zod";
import { client } from "@/main";

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
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [, setLocation] = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleLogin = async (data: Login) => {
    console.log("app :: login.form.ui :: data => ", data);
    try {
      const res = await client.auth.login.$post({ json: data });
      const resData = await res.json();
      console.log("app :: login.form.ui :: res => ", resData);
    } catch (error) {
      console.log("app :: login.form.ui :: error => ", error);
    }
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
              onClick={() => fillDrawer(<RegisterForm />, "Sign up")}
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
              onClick={() =>
                fillDrawer(<ForgotPasswordForm />, "Forgot password")
              }
            >
              Remind
            </button>
          </p>
        </li>
      </ul>
    </form>
  );
}
