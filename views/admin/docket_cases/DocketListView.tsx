import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteDocket, getPastDockets } from "../../../redux/dataSlice";
import MoonLoader from "react-spinners/MoonLoader";
import DocketListTable from "./DocketListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewDocket from "../../../components/admin/ViewDocket";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const CitizenListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, pastDocketList } = useAppSelector(
		(state) => state.dataState
	);

	const {
		viewModal,
		setViewModal,
		showAddModal,
		setShowAddModal,
		showSuccessModal,
		showEditModal,
		setShowEditModal,
		setShowSuccessModal,
		showWarningModal,
		setShowWarningModal,
		showDeleteModal,
		setShowDeleteModal,
	} = useCrudModals();
	const {
		selectedID,
		setSelectedID,
		selectedObject,
		setSelectedObject,
		successText,
		setSuccessText,
	} = useModalIDs();

	useEffect(() => {
		dispatch(getPastDockets());
	}, []);

	const onViewDocketCase = (criminal_record: any) => {
		setSelectedObject(criminal_record);
		setViewModal(true);
	};

	const onShowWarningModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowWarningModal(true);
	};

	const onDeleteCase = useCallback(() => {
		setSuccessText("Deletion of docket record is successful");
		dispatch(deleteDocket(selectedID)).then(() => {
			dispatch(getPastDockets());
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewDocket
				isShow={viewModal}
				viewTitle="Docket Case"
				viewText="View docket record details"
				onClose={() => setViewModal(false)}
				selectedCase={selectedObject}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="docket case"
				onConfirm={() => onDeleteCase()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<AdminBreadCrumbs activeText="Docket Cases" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Docket Cases</h4>
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
					<DocketListTable
						pastDocketList={pastDocketList}
						onViewDocket={(docket_record: any) =>
							onViewDocketCase(docket_record)
						}
						onShowWarning={(e: number) => onShowWarningModal(e)}
					/>
				)}
			</div>
		</div>
	);
};

export default CitizenListView;
