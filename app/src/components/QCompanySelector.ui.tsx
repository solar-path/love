import { Button, Dropdown, TextInput } from "flowbite-react";
import { computed } from "@preact/signals";
import { HiSearch } from "react-icons/hi";
import { fillDrawer } from "@/components/QDrawer.ui";
import { companyList, currentCompany } from "@/routes/company/company.store";
import { useEffect, useState } from "preact/hooks";
import CompanyForm from "@/routes/company/company.form";

export default function QCompanySelector() {
  const [searchTerm, setSearchTerm] = useState("");

  // Listen for company creation and updates
  useEffect(() => {
    const handleCompanyCreated = (event: any) => {
      const newCompany = event.detail;
      companyList.value = [...companyList.value, newCompany];
      currentCompany.value = newCompany;
    };

    const handleCompanyUpdated = (event: any) => {
      const updatedCompany = event.detail;
      companyList.value = companyList.value.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      );
      if (currentCompany.value?.id === updatedCompany.id) {
        currentCompany.value = updatedCompany;
      }
    };

    window.addEventListener("companyCreated", handleCompanyCreated);
    window.addEventListener("companyUpdated", handleCompanyUpdated);

    return () => {
      window.removeEventListener("companyCreated", handleCompanyCreated);
      window.removeEventListener("companyUpdated", handleCompanyUpdated);
    };
  }, []);

  const filteredCompanies = computed(() =>
    companyList.value.filter(
      (company) =>
        company.title !== currentCompany.value?.title &&
        company.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (companyList.value.length === 0) {
    return (
      <Button onClick={() => fillDrawer(CompanyForm, "Create Company")}>
        Create a new company
      </Button>
    );
  }

  return (
    <Dropdown
      label={currentCompany.value?.title || "Select Company"}
      dismissOnClick={false}
      color="dark"
    >
      <Dropdown.Item>
        <TextInput
          className="w-full"
          type="text"
          placeholder="Search..."
          icon={HiSearch as any}
          value={searchTerm}
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </Dropdown.Item>

      {filteredCompanies.value.map((company) => (
        <Dropdown.Item
          key={company.id}
          onClick={() => {
            currentCompany.value = company;
          }}
          className="w-full hover:bg-primary-700 hover:text-white"
        >
          <div className="justify-left flex flex-row items-center gap-2">
            {company.title}
          </div>
        </Dropdown.Item>
      ))}

      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => fillDrawer(CompanyForm, "Create Company")}
        className="flex items-center justify-start gap-2 hover:bg-primary-700 hover:text-white"
      >
        Create a new company
      </Dropdown.Item>
    </Dropdown>
  );
}
