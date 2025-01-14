import { closeDrawer } from "@/components/QDrawer.ui";
import { fillToast } from "@/components/QToast.ui";
import { client } from "@/main";
import type {
  CompanyForFrontend,
  CompanyCreateEdit,
} from "@api/src/routes/business/services/company/company.zod";
import { signal } from "@preact/signals";

export const currentCompany = signal<CompanyForFrontend | null>(null);

export const companyList = signal<CompanyForFrontend[]>([]);

export const createCompany = async (data: CompanyCreateEdit) => {
  console.log("company.store.ts :: createCompany :: data => ", data);
  await client.business.company
    .$post({ json: data })
    .then((res: any) => res.json())
    .then((resData: any) => {
      console.log("company.store.ts :: createCompany :: resData => ", resData);
      companyList.value = [...companyList.value, resData];
      currentCompany.value = resData;
      if (resData.success === true) {
        // companyList.value = [...companyList.value, resData.data.company];
        // currentCompany.value = resData.data.company;
        fillToast("success", resData.message);
        closeDrawer();
      }

      if (resData.success === false) {
        fillToast("error", resData.error);
      }
    })
    .catch((err: any) => {
      console.log("company.store.ts :: createCompany :: err => ", err);
    });
};
