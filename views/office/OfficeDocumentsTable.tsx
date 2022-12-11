import moment from "moment";
import ViewRecord from "../../components/admin/ViewRecord";
import useCrudModals from "../../hooks/useCrudModals";
import useModalIDs from "../../hooks/useModalIDs";

const OfficeDocumentsTable = ({ officeDocuments }: any) => {
    const { viewModal, setViewModal } = useCrudModals();
    const { selectedObject, setSelectedObject } = useModalIDs();

    const onViewDocument = (docs: any) => {
        setSelectedObject(docs);
        setViewModal(true);
    };

    return (
        <div className="overflow-x-auto">
            <ViewRecord
                isShow={viewModal}
                viewTitle="Office Documents"
                viewText="View Office Documents"
                onClose={() => setViewModal(false)}
                selectedRecord={selectedObject}
            />
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Case No.</th>
                        <th className="py-3 px-6 text-left">Date Submitted</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {officeDocuments.map((doc: any) => {
                        return (
                            <tr
                                key={doc.id}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {doc.case__case_no}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {moment(doc.date_received).format("LL")}
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {doc.status}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center gap-x-5">
                                        <div
                                            className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer"
                                            onClick={() => onViewDocument(doc)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OfficeDocumentsTable;
