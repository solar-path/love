import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react"; // Add this import
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fillDrawer } from "@/components/QDrawer.ui";
import InquiryForm from "./inquiry.form";
import { idSchema } from "@api/src/routes/crm/inquiry.zod";

export default function FindInquiryForm() {
  const [record, setRecord] = useState(null); // Add state for response

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
    },
    resolver: yupResolver(idSchema),
  });

  const handleFindInquiry = async (data) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleFindInquiry)}
        className="flex flex-col w-full space-y-2"
      >
        <div>
          <Label htmlFor="id" value="ID" />
          <TextInput
            type="ID"
            {...register("id")}
            color={errors.id ? "failure" : "gray"}
            helperText={errors.id ? errors.id.message : ""}
          />
        </div>

        <Button type="submit" color="dark">
          Find
        </Button>

        <p>
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => fillDrawer(<InquiryForm />, "Inquiry")}
          >
            Submitted another inquiry?{" "}
          </button>
        </p>
      </form>

      {record !== null && (
        <>
          <p>ID #: {record.id}</p>
          <p>Requester: {record.email}</p>
          <p>Message: {record.message}</p>
          <p>
            Response:{" "}
            {record.response === null ? "No response yet" : record.response}
          </p>
          <p>Status: {record.status === null ? "Pending" : record.status}</p>
        </>
      )}
    </>
  );
}
