import countryData from "@/database/data/country.data.json";

export const getCountryList = async () => {
  return countryData;
};

export const getCountryById = async (id: string) => {
  return countryData.find((country) => country.id === id);
};
