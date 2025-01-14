import { Label, TextInput, Button } from "flowbite-react";
import { Building, ScanBarcode, Boxes, Earth } from "lucide-preact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCompany } from "@/routes/company/company.store";
import QInput from "@/components/QInput.ui";
import {
  companyCreateEditSchema,
  type CompanyCreateEdit,
} from "@api/src/routes/business/services/company/company.zod";
import { countryList, industryList } from "@/main";

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CompanyCreateEdit>({
    defaultValues: {
      id: "",
      residence: "",
      residenceId: "",
      industry: "",
      industryId: "",
      title: "",
      bin: "",
      author: "",
    },
    resolver: zodResolver(companyCreateEditSchema),
  });

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
      onSubmit={handleSubmit(createCompany)}
      className="flex flex-col w-full space-y-2"
    >
      <p className="text-sm">
        Please fill in the details below to create your company.
      </p>

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

      <Button type="submit" color="dark">
        add
      </Button>
    </form>
  );
}
