import { MoonLoader } from "react-spinners";
import AddNewButton from "../../../components/AddNewButton";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import BuCorTable from "./BuCorTable";

const BuCorView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading } = useAppSelector((state) => state.dataState);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="BuCor" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">BuCor Custody</h4>
					<AddNewButton
						btnText="New Record"
						onClickAdd={() => console.log("BuCor")}
					/>
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{/*  */}
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
					<BuCorTable
						bucorRecords={[
							{
								name: "John Doe",
								crime: "Theft",
								date_arrived: "11/20/2022",
								assigned_personnel: "Yeah Yow",
							},
						]}
					/>
				)}
			</div>
		</div>
	);
};

export default BuCorView;
