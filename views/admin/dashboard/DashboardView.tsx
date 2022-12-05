import { useEffect } from "react";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import DashboardCalendar from "./DashboardCalendar";
import UpcomingHearings from "./UpcomingHearings";
import RecentDocuments from "./RecentDocuments";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	getCourtHearings,
	getUpcomingHearings,
	getRecentDocuments,
} from "../../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import Link from "next/link";

const DashboardView = () => {
	const dispatch = useAppDispatch();
	const {
		dataLoading,
		courtHearingList,
		upcomingHearingList,
		recentDocuments,
	} = useAppSelector((state) => state.dataState);

	useEffect(() => {
		dispatch(getCourtHearings());
		dispatch(getUpcomingHearings());
		dispatch(getRecentDocuments());
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="Dashboard" />
			{/*  */}
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex flex-col justify-between items-center gap-y-5">
					<h4 className="self-start text-xl font-black tracking-wider">
						Calendar of Events
					</h4>
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					{dataLoading && (
						<div className="w-full flex justify-center items-center">
							<MoonLoader
								loading={dataLoading}
								color="#9333ea"
								speedMultiplier={1}
								size={70}
							/>
						</div>
					)}
					{!dataLoading && <DashboardCalendar hearingList={courtHearingList} />}
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
			</div>
			{/*  */}
			<div className="grid grid-cols-2 items-start gap-x-5">
				{/* UPCOMING HEARINGS */}
				<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
					<div className="w-full flex flex-col justify-between items-center gap-y-5">
						<div className="w-full flex justify-between items-center">
							<h4 className="self-start text-xl font-black tracking-wider">
								Upcoming Hearings
							</h4>
							<Link href="/admin/court_hearings">
								<p className="text-sm text-purple-500 hover:cursor-pointer">
									View All
								</p>
							</Link>
						</div>
						<div className="w-full border-b border-gray-200 -mt-3"></div>
						{dataLoading && (
							<div className="w-full flex justify-center items-center">
								<MoonLoader
									loading={dataLoading}
									color="#9333ea"
									speedMultiplier={1}
									size={70}
								/>
							</div>
						)}
						{!dataLoading && (
							<UpcomingHearings upcomingHearings={upcomingHearingList} />
						)}
					</div>
				</div>

				{/* RECENT DOCUMENTS */}
				<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
					<div className="w-full flex flex-col justify-between items-center gap-y-5">
						<div className="w-full flex justify-between items-center">
							<h4 className="self-start text-xl font-black tracking-wider">
								Recent Documents
							</h4>
							<Link href="/admin/transfered_documents">
								<p className="text-sm text-purple-500 hover:cursor-pointer">
									View All
								</p>
							</Link>
						</div>
						<div className="w-full border-b border-gray-200 -mt-3"></div>
						{dataLoading && (
							<div className="w-full flex justify-center items-center">
								<MoonLoader
									loading={dataLoading}
									color="#9333ea"
									speedMultiplier={1}
									size={70}
								/>
							</div>
						)}
						{!dataLoading && (
							<RecentDocuments recentDocuments={recentDocuments} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardView;
