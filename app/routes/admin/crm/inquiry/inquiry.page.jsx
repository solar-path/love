import { turso } from "@database/turso";

const inquiryList = await turso.execute(`SELECT * FROM crm_inquiry`);

export default function InquiryPage() {
  console.log(inquiryList);
  return <div>InquiryPage</div>;
}
