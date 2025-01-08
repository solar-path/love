import { Label, Button, TextInput } from "flowbite-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-preact";

// Define a schema for login validation
// Define a schema for login validation
const forgotSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  })
  .required();

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotSchema),
  });

  const handleForgot = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleForgot)}
      className="flex flex-col w-full space-y-2"
    >
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
      <Button type="submit" color="dark">
        Send instructions
      </Button>
    </form>
  );
}
