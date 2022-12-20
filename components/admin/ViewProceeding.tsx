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
	const TimeText = (hours_time: number, minutes_time: string) => {
		return hours_time > 12
			? `${hours_time - 12} : ${minutes_time} PM`
			: `${hours_time} : ${minutes_time} AM`;
	};

	let start_time_hour =
		selectedProceeding?.start_time !== undefined
			? selectedProceeding.start_time.substring(0, 2) * 1
			: 0;
	let start_time_minutes =
		selectedProceeding?.start_time !== undefined
			? selectedProceeding.start_time.substring(
					3,
					selectedProceeding.start_time.length
			  )
			: 0;

	let end_time_hour =
		selectedProceeding?.end_time !== undefined
			? selectedProceeding.end_time.substring(0, 2) * 1
			: 0;
	let end_time_minutes =
		selectedProceeding?.end_time !== undefined
			? selectedProceeding.end_time.substring(
					3,
					selectedProceeding.end_time.length
			  )
			: 0;

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
					<h4 className="font-bold">Date</h4>
					<p className="text-sm text-gray-500">
						{moment(selectedProceeding.proceeding_schedule).format("LL")}
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
					<h4 className="font-bold">Start Time</h4>
					<p className="text-sm text-gray-500">
						{TimeText(start_time_hour, start_time_minutes)}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">End Time</h4>
					<p className="text-sm text-gray-500">
						{TimeText(end_time_hour, end_time_minutes)}
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
