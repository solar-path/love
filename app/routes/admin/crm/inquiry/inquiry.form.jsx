import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { Mail } from "lucide-preact";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FindInquiryForm from "./findInquiry.form";
import { fillDrawer } from "@components/QDrawer.ui";
import { inquirySchema } from "./inquiry.yup";
// import { addInquiry } from "../../../../../api/src/inquiry.store";
import { fillToast } from "@components/QToast.ui";
import { closeDrawer } from "@components/QDrawer.ui";

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
    // const record = await addInquiry(data);
    // console.log("inquiry.form.jsx :: record => ", record);
    // if (record) {
    //   fillToast("success", `Inquiry ${record.id} submitted successfully`);
    //   closeDrawer();
    // } else {
    //   fillToast("error", "Failed to submit inquiry");
    // }
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
