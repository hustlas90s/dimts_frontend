import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getDocketList } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import EmailListTable from "./EmailListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";

const MailsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading } = useAppSelector((state: any) => state.dataState);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="Emailed Documents" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Emailed Documents
					</h4>
					<AddNewButton btnText="New Email" />
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
				{!dataLoading && <EmailListTable emailList={[]} />}
			</div>
		</div>
	);
};

export default MailsView;
