import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getStaffList, deleteAccount } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import StaffListTable from "./StaffListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import RegisterStaff from "../../../components/admin/RegisterStaff";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const StaffListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, staffList } = useAppSelector(
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
		dispatch(getStaffList());
	}, []);

	const onSubmitNewAccount = useCallback(() => {
		dispatch(getStaffList());
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 2000);
	}, []);

	const onShowDeleteModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowDeleteModal(true);
	};

	const onDeleteAccount = () => {
		dispatch(deleteAccount(selectedID)).then(() => {
			dispatch(getStaffList());
			setShowDeleteModal(false);
		});
	};

	return (
		<div className="relative flex flex-col gap-y-5 font-mont text-gray-700">
			<RegisterStaff
				isShow={showAddModal}
				onConfirm={() => onSubmitNewAccount()}
				onCancel={() => setShowAddModal(false)}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Staff Account"
				successText="New staff account registered successfully"
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="staff account"
				onConfirm={() => onDeleteAccount()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Staff Accounts" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Staff Accounts</h4>
					<AddNewButton
						btnText="New Staff"
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
					<StaffListTable
						staffList={staffList}
						onShowWarning={(e: number) => onShowDeleteModal(e)}
					/>
				)}
			</div>
		</div>
	);
};

export default StaffListView;
