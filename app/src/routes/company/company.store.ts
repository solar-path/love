import type { Company } from "@api/src/routes/business/services/company.zod";
import { signal } from "@preact/signals";

export const currentCompany = signal<Company | null>(null);

export const companyList = signal([]);

export const createCompany = async (data: Company) => {
  console.log("company.store.ts :: createCompany :: data => ", data);
};
