import QTable from "@components/QTable.ui";
import { db } from "@database/drizzle";
import { inquiryTable } from "@database/schema/crm.drizzle";
import { fillDrawer } from "@components/QDrawer.ui";
import InquiryForm from "./inquiry.form";
import RespondToInquiryForm from "./respondToInquiry.form";

const inquiryList = await db.select().from(inquiryTable);

export default function InquiryPage() {
  console.log(inquiryList);

  const tableActions = [
    {
      label: "Add",
      location: "main",
      onClick: () => fillDrawer(<InquiryForm />, "Add New Inquiry"),
    },
    {
      label: "Reply to inquiry",
      location: "row",
      component: (rowData) => (
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() =>
            fillDrawer(
              () => <RespondToInquiryForm inquiryId={rowData.id.value} />,
              "Reply to inquiry"
            )
          }
        >
          <MdEdit size={20} className="hover:text-red-700" />
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* <QTable
        items={inquiryList}
        caption="Inquiry"
        description="Manage inquiries."
        actions={tableActions}
      /> */}
    </div>
  );
}
