import { useState } from "preact/hooks";
import { Label, TextInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import RegisterForm from "./register.form";
import { Mail, Lock, Eye, EyeOff } from "lucide-preact";
import { closeDrawer, fillDrawer } from "@/components/QDrawer.ui";
import ForgotPasswordForm from "./forgot.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type Login } from "@api/src/routes/auth/auth.zod";
import { client } from "@/main";
import { fillToast } from "@/components/QToast.ui";

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleLogin = async (data: Login) => {
    client.auth.login
      .$post({ json: data })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success === true) {
          fillToast("success", resData.message);
          closeDrawer();
          // navigate("/");
        }
        if (resData.success === false) {
          fillToast("error", resData.error);
        }
      })
      .catch((error) => {
        console.log("app :: login.form.ui :: error => ", error);
      });
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
          icon={Mail as any}
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
            icon={Lock as any}
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
