import ViewModal from "../ViewModal";
import moment from "moment";

interface ViewHearingParams {
	isShow: boolean;
	onClose(): void;
	selectedHearing: any;
}

const ViewHearing = ({
	isShow,
	onClose,
	selectedHearing,
}: ViewHearingParams) => {
	const TimeText = (hours_time: number, minutes_time: string) => {
		return hours_time > 12
			? `${hours_time - 12} : ${minutes_time} PM`
			: `${hours_time} : ${minutes_time} AM`;
	};

	let start_time_hour =
		selectedHearing?.start_time !== undefined
			? selectedHearing.start_time.substring(0, 2) * 1
			: 0;
	let start_time_minutes =
		selectedHearing?.start_time !== undefined
			? selectedHearing.start_time.substring(
					3,
					selectedHearing.start_time.length
			  )
			: 0;

	let end_time_hour =
		selectedHearing?.end_time !== undefined
			? selectedHearing.end_time.substring(0, 2) * 1
			: 0;
	let end_time_minutes =
		selectedHearing?.end_time !== undefined
			? selectedHearing.end_time.substring(3, selectedHearing.end_time.length)
			: 0;

	return (
		<ViewModal
			isShow={isShow}
			viewTitle="Court Hearing"
			viewText="View court hearing schedule"
			onClose={onClose}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Case No</h4>
					<p className="text-sm text-gray-500">
						{selectedHearing.case__case_no}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Crime Type</h4>
					<p className="text-sm text-gray-500">
						{selectedHearing.case__type_of_case !== undefined &&
						selectedHearing?.case__type_of_case.includes("[")
							? selectedHearing.case__type_of_case
									.slice(1, -1)
									.replace(/['"]+/g, "")
							: selectedHearing.case__type_of_case}
					</p>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Hearing Schedule</h4>
					<p className="text-sm text-gray-500">
						{selectedHearing.hearing_schedule}
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
				<div className="flex flex-col gap-y-1">
					<h4 className="font-bold">Status</h4>
					<p className="text-sm text-gray-500">{selectedHearing.status}</p>
				</div>
			</div>
		</ViewModal>
	);
};

export default ViewHearing;
