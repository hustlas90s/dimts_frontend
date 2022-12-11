import ViewModal from "../ViewModal";

interface ViewDocumentParams {
	isShow: boolean;
	onClose(): void;
	selectedDocument: any;
}

const ViewDocument = ({
	isShow,
	onClose,
	selectedDocument,
}: ViewDocumentParams) => {
	return (
		<ViewModal
			isShow={isShow}
			viewTitle="Citizen Account"
			viewText="View citizen account details"
			onClose={onClose}
		>
			<div className="flex flex-col gap-y-8 font-mont text-gray-700">
				<div className="w-full h-72 bg-gray-100 rounded-lg"></div>
				{/* CITIZEN NAME */}
				<div className="grid grid-cols-2 gap-x-5">
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">First Name</h4>
						<p className="text-sm text-gray-500">
							{selectedDocument.first_name}
						</p>
					</div>
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Last Name</h4>
						<p className="text-sm text-gray-500">
							{selectedDocument.last_name}
						</p>
					</div>
				</div>
				{/* CONTACT DETAILS */}
				<div className="grid grid-cols-2 gap-x-5">
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Mobile Number</h4>
						<p className="text-sm text-gray-500">
							{selectedDocument.contact_number}
						</p>
					</div>
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Email</h4>
						<p className="text-sm text-gray-500">{selectedDocument.email}</p>
					</div>
				</div>
				{/* CITIZEN ADDRESS */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Adress</h4>
					<p className="text-sm text-gray-500">{selectedDocument.address}</p>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewDocument;
