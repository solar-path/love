import { useState, useEffect } from "preact/hooks";
import { Label, TextInput, Button } from "flowbite-react";
import { Building, ScanBarcode, Boxes, Earth } from "lucide-preact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import QInput from "@/components/QInput.ui";
import {
  companySchema,
  type Company,
} from "@api/src/routes/business/services/company/company.zod";
import { client } from "@/main";
import { currentUser } from "../auth/auth.store";
import { createCompany } from "./company.store";

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Company>({
    defaultValues: {
      residence: "",
      residenceId: "",
      industry: "",
      industryId: "",
      title: "",
      bin: "",
      author: "",
    },
    resolver: zodResolver(companySchema),
  });

  const [industryList, setIndustryList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const handleSearchSelect = (
    field: "industry" | "residence",
    value: string,
    id: string
  ) => {
    setValue(field, value);
    setValue(`${field}Id`, id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const industryRes = await client.business.industry.$get();
      const industryData = await industryRes.json();
      setIndustryList(industryData);

      const countryRes = await client.business.country.$get();
      const countryData = await countryRes.json();
      setCountryList(countryData);
    };

    fetchData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (currentUser?.value?.id) {
          createCompany({ ...data, author: currentUser.value.id });
        }
      })}
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
        items={industryList}
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
        items={countryList}
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
