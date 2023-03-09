import moment from "moment";

const CaseProceedingsTable = ({ caseProceedingsList }: any) => {
	const TimeText = (hours_time: number, minutes_time: string) => {
		return hours_time > 12
			? `${hours_time - 12} : ${minutes_time} PM`
			: `${hours_time} : ${minutes_time} AM`;
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Proceeding Type</th>
						<th className="py-3 px-6 text-left">Date Scheduled</th>
						<th className="py-3 px-6 text-left">Start Time</th>
						<th className="py-3 px-6 text-left">End Time</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{caseProceedingsList.map((proceeding: any) => {
						let start_time_hour = proceeding.start_time.substring(0, 2) * 1;
						let start_time_minutes = proceeding.start_time.substring(
							3,
							proceeding.start_time.length
						);
						let end_time_hour = proceeding.end_time.substring(0, 2) * 1;
						let end_time_minutes = proceeding.end_time.substring(
							3,
							proceeding.end_time.length
						);
						return (
							<tr
								key={proceeding.id}
								className="border-b border-gray-200 hover:bg-gray-50"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{proceeding.proceeding_type}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(proceeding.proceeding_schedule).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{TimeText(start_time_hour, start_time_minutes)}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{TimeText(end_time_hour, end_time_minutes)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CaseProceedingsTable;
