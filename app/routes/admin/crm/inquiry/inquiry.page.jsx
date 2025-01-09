import QTable from "@components/QTable.ui";

import { fillDrawer } from "@components/QDrawer.ui";
import InquiryForm from "./inquiry.form";
import RespondToInquiryForm from "./respondToInquiry.form";
import { getInquiryList } from "./inquiry.store";
import { useEffect, useState } from "preact/hooks";

export default function InquiryPage() {
  const [inquiryList, setInquiryList] = useState([]);

  useEffect(() => {
    const fetchInquiryList = async () => {
      const data = await getInquiryList();
      setInquiryList(data);
    };
    fetchInquiryList().catch((error) => {
      console.error("Error fetching inquiry list:", error);
    });
  }, []);

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
      <pre>{JSON.stringify(inquiryList, null, 2)}</pre>
      {/* <QTable
        items={inquiryList}
        caption="Inquiry"
        description="Manage inquiries."
        actions={tableActions}
      /> */}
    </div>
  );
}
