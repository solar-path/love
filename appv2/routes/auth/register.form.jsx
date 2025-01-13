import { useState } from "preact/hooks";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { fillDrawer } from "@components/QDrawer.ui";
import LoginForm from "./login.form";
import QInput from "@components/QInput.ui";
import { getIndustryList } from "@api/src/modules/business/industry/getIndustryList.helper";
import { getCountryList } from "@helpers/getCountryList.helper";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      terms: false,
      residence: "",
      residenceId: "",
      industry: "",
      industryId: "",
      company: "",
      bin: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = (data) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const industryList = getIndustryList();
  const countryList = getCountryList();

  const handleSearchSelect = (field, value, id) => {
    setValue(field, value);
    setValue(`${field}Id`, id);
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
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
            autoComplete="off"
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

      <div>
        <Label htmlFor="passwordConfirm" value="Confirm Password" />
        <div className="relative">
          <TextInput
            autoComplete="off"
            type={showConfirmPassword ? "text" : "password"}
            icon={Lock}
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
        <Label htmlFor="company" value="Company" />
        <TextInput
          type="text"
          {...register("company")}
          icon={Building}
          color={errors.company ? "failure" : "gray"}
          helperText={errors.company ? errors.company.message : ""}
        />
      </div>

      <div>
        <Label htmlFor="bin" value="Business Identification Number" />
        <TextInput
          type="text"
          {...register("bin")}
          icon={ScanBarcode}
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
        items={industryList}
        icon={Boxes}
        searchField="title"
        displayAsHelper="description"
        onChange={(e) =>
          handleSearchSelect("industry", e.target.value, e.target.dataset.id)
        }
      />

      <QInput
        label="Residence"
        id="residence"
        name="residence"
        value={watch("residence")}
        error={errors.residence?.message}
        items={countryList}
        icon={Earth}
        searchField="title"
        onChange={(e) =>
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
              onClick={() => fillDrawer(<LoginForm />, "Sign in")}
            >
              Sign in
            </button>
          </p>
        </li>
      </ul>
    </form>
  );
}
