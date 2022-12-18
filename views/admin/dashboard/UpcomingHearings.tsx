import moment from "moment";

const UpcomingHearings = ({ upcomingHearings }: any) => {
	return (
		<div className="w-full overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
						<th className="py-3 px-6 text-left">Case No.</th>
						<th className="py-3 px-6 text-left">Hearing Schedule</th>
						<th className="py-3 px-6 text-left">Status</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm">
					{upcomingHearings.map((hearing: any) => {
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
									{hearing.status}
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
