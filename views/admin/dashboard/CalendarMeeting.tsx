import moment from "moment";

const CalendarMeeting = ({ hearing }: any) => {
	let start_time_hour = hearing.start_time.substring(0, 2) * 1;
	let start_time_minutes = hearing.start_time.substring(
		3,
		hearing.start_time.length
	);
	let end_time_hour = hearing.end_time.substring(0, 2) * 1;
	let end_time_minutes = hearing.end_time.substring(3, hearing.end_time.length);

	const TimeText = (hours_time: number, minutes_time: string) => {
		return hours_time > 12
			? `${hours_time - 12} : ${minutes_time} PM`
			: `${hours_time} : ${minutes_time} AM`;
	};

	return (
		<li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
			<div className="w-10 h-10 rounded-full bg-purple-500 flex justify-center items-center">
				<p className="text-sm text-white font-semibold">
					{hearing.case__type_of_case.substring(0, 2)}
				</p>
			</div>
			<div className="flex-auto">
				<p className="text-gray-700 font-bold">{hearing.case__case_no}</p>
				<p className="mt-0.5">
					<time dateTime={hearing.start_time}>
						{TimeText(start_time_hour, start_time_minutes)}
					</time>{" "}
					-{" "}
					<time dateTime={hearing.end_time}>
						{TimeText(end_time_hour, end_time_minutes)}
					</time>
				</p>
			</div>
		</li>
	);
};

export default CalendarMeeting;
