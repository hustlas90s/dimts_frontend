import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewCaseParams {
	isShow: boolean;
	viewTitle: string;
	viewText: string;
	onClose(): void;
	selectedCase: any;
}

const ViewCase = ({
	isShow,
	viewTitle,
	viewText,
	onClose,
	selectedCase,
}: ViewCaseParams) => {
	return (
		<ViewModal
			isShow={isShow}
			viewTitle={viewTitle}
			viewText={viewText}
			onClose={onClose}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Type of Case</h4>
					<p className="text-sm text-gray-500">{selectedCase.type_of_case}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case No.</h4>
					<p className="text-sm text-gray-500">{selectedCase.case_no}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Document Title</h4>
					<p className="text-sm text-gray-500">{selectedCase.document_title}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case Title</h4>
					<p className="text-sm text-gray-500">{selectedCase.case_title}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Crime Type</h4>
					<p className="text-sm text-gray-500">{selectedCase.crime_type}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Received Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.received_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Hearing Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.hearing_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Arraignment Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.arraignment_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Initial Trial Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedCase.initial_trial_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Raffled Court</h4>
					<p className="text-sm text-gray-500">{selectedCase.raffled_court}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Judge Assigned</h4>
					<p className="text-sm text-gray-500">{selectedCase.judge_assigned}</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case Status</h4>
					<p className="text-sm text-gray-500">{selectedCase.case_status}</p>
				</div>
				{/*  */}
				<div className="col-span-2 flex flex-col gap-y-1">
					<h4 className="font-bold">Last Court Action</h4>
					<p className="text-sm text-gray-500">
						{selectedCase.last_court_action}
					</p>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewCase;
