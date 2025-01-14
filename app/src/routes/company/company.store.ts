import type {
  CompanyForFrontend,
  CompanyCreateEdit,
} from "@api/src/routes/business/services/company/company.zod";
import { signal } from "@preact/signals";

export const currentCompany = signal<CompanyForFrontend | null>(null);

export const companyList = signal<CompanyForFrontend[]>([]);

export const createCompany = async (data: CompanyCreateEdit) => {
  console.log("company.store.ts :: createCompany :: data => ", data);
};
