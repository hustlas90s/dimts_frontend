import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteAccount, getCitizenList } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import CitizenListTable from "./CitizenListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import RegisterCitizen from "../../../components/admin/RegisterCitizen";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const CitizenListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, citizenList } = useAppSelector(
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
		dispatch(getCitizenList());
	}, []);

	const onSubmitNewAccount = useCallback(() => {
		dispatch(getCitizenList());
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, []);

	const onShowDeleteModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowDeleteModal(true);
	};

	const onDeleteAccount = () => {
		dispatch(deleteAccount(selectedID)).then(() => {
			dispatch(getCitizenList());
			setShowDeleteModal(false);
		});
	};

	return (
		<div className="relative flex flex-col gap-y-5 font-mont text-gray-700">
			<RegisterCitizen
				isShow={showAddModal}
				onConfirm={() => onSubmitNewAccount()}
				onCancel={() => setShowAddModal(false)}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Citizen Account"
				successText="New citizen account registered successfully"
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="citizen account"
				onConfirm={() => onDeleteAccount()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Citizen List" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Citizen List</h4>
					<AddNewButton
						btnText="New Citizen"
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
					<CitizenListTable
						citizenList={citizenList}
						onShowWarning={(e: number) => onShowDeleteModal(e)}
					/>
				)}
			</div>
		</div>
	);
};

export default CitizenListView;
