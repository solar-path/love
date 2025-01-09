import industryData from "@/database/data/industry.data.json";

export const getIndustryList = async () => {
  return industryData
    .filter(
      (industry) => industry.description !== "" && industry.parent !== null
    )
    .map((industry) => ({
      id: industry.id,
      title: industry.title,
      description: industry.description,
    }));
};

export const getIndustryById = async (id: string) => {
  return industryData.find((industry) => industry.id === id);
};
