import moment from "moment";

const UpcomingHearings = ({ upcomingHearings }: any) => {
	const TimeText = (hours_time: number, minutes_time: string) => {
		return hours_time > 12
			? `${hours_time - 12} : ${minutes_time} PM`
			: `${hours_time} : ${minutes_time} AM`;
	};

	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Hearing Schedule</th>
						<th className="py-3 px-6 text-left">Start Time</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{upcomingHearings.map((hearing: any) => {
						let start_time_hour = hearing.start_time.substring(0, 2) * 1;
						let start_time_minutes = hearing.start_time.substring(
							3,
							hearing.start_time.length
						);
						return (
							<tr
								key={hearing.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{hearing.case__case_no}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(hearing.hearing_schedule).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{TimeText(start_time_hour, start_time_minutes)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UpcomingHearings;
