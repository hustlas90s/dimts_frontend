import moment from "moment";

const CourtHearingsTable = ({
	courtHearings,
	onShowWarning,
	onShowEdit,
}: any) => {
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
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Crime Type</th>
						<th className="py-3 px-6 text-left">Hearing Schedule</th>
						<th className="py-3 px-6 text-left">Start Time</th>
						<th className="py-3 px-6 text-left">End Time</th>
						<th className="py-3 px-6 text-center">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{courtHearings.map((hearing: any) => {
						let start_time_hour = hearing.start_time.substring(0, 2) * 1;
						let start_time_minutes = hearing.start_time.substring(
							3,
							hearing.start_time.length
						);
						let end_time_hour = hearing.end_time.substring(0, 2) * 1;
						let end_time_minutes = hearing.end_time.substring(
							3,
							hearing.end_time.length
						);
						return (
							<tr className="border-b border-gray-200 hover:bg-gray-50">
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{hearing.case__case_no}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{hearing.case__crime_type}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(hearing.hearing_schedule).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{TimeText(start_time_hour, start_time_minutes)}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{TimeText(end_time_hour, end_time_minutes)}
								</td>
								<td className="py-3 px-6 text-center">
									<div className="flex items-center justify-center gap-x-5">
										<div
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer"
											onClick={() => onShowEdit(hearing.id)}
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
													d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
												/>
											</svg>
										</div>
										<div
											className="w-4 mr-2 transform hover:text-purple-600 hover:scale-110 cursor-pointer"
											onClick={() => onShowWarning(hearing.id)}
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
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

export default CourtHearingsTable;
