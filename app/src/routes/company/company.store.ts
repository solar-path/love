import { signal } from "@preact/signals";

export const currentCompany = signal(null);

export const companyList = signal([]);

export const setCurrentCompany = (company: any) => {
  // do something
};
