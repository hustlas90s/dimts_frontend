import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getDocketList, getProvinces } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import OfficeListTable from "./OfficeListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import RegisterOffice from "../../../components/admin/RegisterOffice";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const OfficeListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, provinceList } = useAppSelector(
		(state: any) => state.dataState
	);
	const {
		showAddModal,
		setShowAddModal,
		showSuccessModal,
		setShowSuccessModal,
		showDeleteModal,
		setShowDeleteModal,
	} = useCrudModals();
	const { selectedID, setSelectedID } = useModalIDs();

	useEffect(() => {
		dispatch(getProvinces());
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<RegisterOffice
				isShow={showAddModal}
				onConfirm={() => setShowAddModal(false)}
				onCancel={() => setShowAddModal(false)}
				selectOptions={provinceList}
			/>
			<AdminBreadCrumbs activeText="Offices Accounts" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Offices Accounts
					</h4>
					<AddNewButton
						btnText="New Account"
						onClickAdd={() => setShowAddModal(true)}
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
					<OfficeListTable officeList={[{ first_name: "Tagum City" }]} />
				)}
			</div>
		</div>
	);
};

export default OfficeListView;
