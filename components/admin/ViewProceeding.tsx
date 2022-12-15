import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewProceedingParams {
	isShow: boolean;
	onClose(): void;
	selectedProceeding: any;
}

const ViewProceeding = ({
	isShow,
	onClose,
	selectedProceeding,
}: ViewProceedingParams) => {
	return (
		<ViewModal
			isShow={isShow}
			viewTitle="Court Proceeding"
			viewText="View court proceeding details"
			onClose={onClose}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case No.</h4>
					<p className="text-sm text-gray-500">
						{selectedProceeding.case__case_no}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Crime/Offense</h4>
					<p className="text-sm text-gray-500">
						{selectedProceeding?.case__crime_type !== undefined &&
						selectedProceeding?.case__crime_type.includes("[")
							? selectedProceeding.case__crime_type
									.slice(1, -1)
									.replace(/['"]+/g, "")
							: selectedProceeding.case__crime_type}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Proceeding Type</h4>
					<p className="text-sm text-gray-500">
						{selectedProceeding.proceeding_type}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedProceeding.proceeding_date).format("LL")}
					</p>
				</div>
				{/*  */}
				<div className="col-span-2">
					<div className="flex flex-col gap-y-1">
						<h4 className="font-bold">Remarks</h4>
						<p className="text-sm text-gray-500">
							{selectedProceeding.remarks}
						</p>
					</div>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewProceeding;
