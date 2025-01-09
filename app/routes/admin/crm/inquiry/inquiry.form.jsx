import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { Mail } from "lucide-preact";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FindInquiryForm from "./findInquiry.form";
import { fillDrawer } from "@components/QDrawer.ui";

const inquirySchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  message: yup.string().required("Message cannot be empty"),
});

export default function Inquiry() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: yupResolver(inquirySchema),
  });

  const handleInquiry = async (data) => {
    console.log(data);

    console.log("inquiry.form.jsx :: record => ", record);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleInquiry)}
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
        <div>
          <Label htmlFor="message" value="Message" />
          <Textarea
            id="message"
            rows={4}
            {...register("message")}
            color={errors.message ? "failure" : "gray"}
            helperText={errors.message ? errors.message.message : ""}
          />
        </div>
        <Button type="submit" color="dark">
          Submit
        </Button>

        <p className="text-sm">
          Have already submitted inquiry?{" "}
          <button
            type="button"
            className="text-red-500"
            onClick={() => fillDrawer(<FindInquiryForm />, "Track inquiry")}
          >
            Check response
          </button>
        </p>
      </form>
    </>
  );
}
