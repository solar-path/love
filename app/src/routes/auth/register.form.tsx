import { useState, useEffect } from "preact/hooks";
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  ScanBarcode,
  Boxes,
  Earth,
} from "lucide-preact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fillDrawer } from "@/components/QDrawer.ui";
import LoginForm from "@/routes/auth/login.form";
import QInput from "@/components/QInput.ui";
import { registerSchema, type Register } from "@api/src/routes/auth/auth.zod";
import { client, countryList, industryList } from "@/main";
import { signUp } from "./auth.store";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Register>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      terms: false,
      residence: "",
      residenceId: "",
      industry: "",
      industryId: "",
      title: "",
      bin: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [industryList, setIndustryList] = useState([]);
  // const [countryList, setCountryList] = useState([]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSearchSelect = (
    field: "industry" | "residence",
    value: string,
    id: string
  ) => {
    setValue(field, value);
    setValue(`${field}Id`, id);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => signUp(data))}
      className="flex flex-col w-full space-y-2"
    >
      <p className="text-sm">
        Please fill in the details below to create your account. Ensure your
        password meets the required criteria.
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
            autoComplete="off"
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

      <div>
        <Label htmlFor="passwordConfirm" value="Confirm Password" />
        <div className="relative">
          <TextInput
            autoComplete="off"
            type={showConfirmPassword ? "text" : "password"}
            icon={Lock as any}
            color={errors.passwordConfirm ? "failure" : "gray"}
            helperText={
              errors.passwordConfirm ? errors.passwordConfirm.message : ""
            }
            {...register("passwordConfirm")}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="title" value="Company" />
        <TextInput
          type="text"
          {...register("title")}
          icon={Building as any}
          color={errors.title ? "failure" : "gray"}
          helperText={errors.title ? errors.title.message : ""}
        />
      </div>

      <div>
        <Label htmlFor="bin" value="Business Identification Number" />
        <TextInput
          type="text"
          {...register("bin")}
          icon={ScanBarcode as any}
          color={errors.bin ? "failure" : "gray"}
          helperText={errors.bin ? errors.bin.message : ""}
        />
      </div>

      <QInput
        label="Industry"
        name="industry"
        id="industry"
        value={watch("industry")}
        error={errors.industry?.message}
        items={industryList.value}
        icon={Boxes as any}
        searchField="title"
        displayAsHelper="description"
        onChange={(e: { target: { value: string; dataset: { id: string } } }) =>
          handleSearchSelect("industry", e.target.value, e.target.dataset.id)
        }
      />

      <QInput
        label="Residence"
        id="residence"
        name="residence"
        value={watch("residence")}
        error={errors.residence?.message}
        items={countryList.value}
        icon={Earth as any}
        searchField="title"
        onChange={(e: { target: { value: string; dataset: { id: string } } }) =>
          handleSearchSelect("residence", e.target.value, e.target.dataset.id)
        }
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" {...register("terms")} />
          <Label htmlFor="terms">
            I agree to the&nbsp;
            <a className="text-red-500" href="/terms">
              Terms of Use
            </a>
            &nbsp;and&nbsp;
            <a className="text-red-500" href="/privacy">
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500">{errors.terms.message}</p>
        )}
      </div>

      <Button type="submit" color="dark">
        Register
      </Button>
      <ul>
        <li>
          {" "}
          <p className="text-sm">
            Already have an account?{" "}
            <button
              type="button"
              className="text-red-500"
              onClick={() => fillDrawer(LoginForm, "Sign in")}
            >
              Sign in
            </button>
          </p>
        </li>
      </ul>
    </form>
  );
}
