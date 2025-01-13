import { Label, Button, TextInput } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-preact";
import { forgotPasswordSchema } from "@api/src/routes/auth/auth.zod";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
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
