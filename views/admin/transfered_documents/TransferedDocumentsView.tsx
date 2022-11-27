import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getDocketList } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import TransferedDocumentsTable from "./TransferedDocumentsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";

const ServedDocsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading } = useAppSelector((state: any) => state.dataState);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AdminBreadCrumbs activeText="Served Documents" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Transfered Documents
					</h4>
					{/*  */}
					<button
						type="button"
						className={`bg-purple-600 hover:bg-purple-500 px-3 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200 flex items-center gap-x-2`}
						onClick={() => console.log("Justine Gwapo")}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>

						<p className="text-sm tracking-wider">Send Document</p>
					</button>
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
				{!dataLoading && <TransferedDocumentsTable transaferedDocuments={[]} />}
			</div>
		</div>
	);
};

export default ServedDocsView;
