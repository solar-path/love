import { db } from "@/database/database";
import { riskTable } from "@/database/schema/erm.drizzle";
import { eq } from "drizzle-orm";

export const getRiskRegisterByCompanyId = async (companyId: string) => {
  const riskRegister = await db.query.riskTable.findMany({
    where: eq(riskTable.company, companyId),
    with: {
      author: true,
      actions: true,
      riskOwner: true,
      score: true,
    },
  });
  return {
    companyId,
    riskRegister,
  };
};
