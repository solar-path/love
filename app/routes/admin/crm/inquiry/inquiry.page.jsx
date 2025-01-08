import { turso } from "app/database/turso";

const inquiryList = await turso.execute(sql`SELECT * FROM crm_inquiry`);

export default function InquiryPage() {
  console.log(inquiryList);
  return <div>InquiryPage</div>;
}
