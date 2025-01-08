import industryData from "./industry.data.json";

export const getIndustryList = () => {
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
