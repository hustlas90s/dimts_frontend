interface CalendarMeetingProps {
	caseProceeding: any;
}

const CalendarMeeting = ({ caseProceeding }: CalendarMeetingProps) => {
	let start_time_hour = caseProceeding.start_time.substring(0, 2) * 1;
	let start_time_minutes = caseProceeding.start_time.substring(
		3,
		caseProceeding.start_time.length
	);
	let end_time_hour = caseProceeding.end_time.substring(0, 2) * 1;
	let end_time_minutes = caseProceeding.end_time.substring(
		3,
		caseProceeding.end_time.length
	);

	const TimeText = (hours_time: number, minutes_time: string) => {
		return hours_time > 12
			? `${hours_time - 12} : ${minutes_time} PM`
			: `${hours_time} : ${minutes_time} AM`;
	};

	return (
		<li className="">
			{caseProceeding && (
				<div className="flex items-center py-2 space-x-4 group rounded-xl">
					<div className="flex-auto">
						<p className="text-gray-700 font-bold">{caseProceeding.status}</p>
						<p className="mt-0.5">
							<time dateTime={caseProceeding.start_time}>
								{TimeText(start_time_hour, start_time_minutes)}
							</time>{" "}
							-{" "}
							<time dateTime={caseProceeding.end_time}>
								{TimeText(end_time_hour, end_time_minutes)}
							</time>
						</p>
						<p className="text-xs mt-3">{caseProceeding.remarks}</p>
					</div>
				</div>
			)}
		</li>
	);
};

export default CalendarMeeting;
