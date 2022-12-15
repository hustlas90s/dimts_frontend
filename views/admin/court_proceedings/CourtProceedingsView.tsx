import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteCourtProceeding,
	getCourtProceedings,
	getCurrentDockets,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import ProceedingsTable from "./ProceedingsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import AddProceeding from "../../../components/admin/AddProceeding";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const CourtProceedingsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, courtProceedingsList, currentDocketList } =
		useAppSelector((state) => state.dataState);

	const {
		showAddModal,
		setShowAddModal,
		showSuccessModal,
		setShowSuccessModal,
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
		dispatch(getCurrentDockets());
		dispatch(getCourtProceedings());
	}, []);

	const onShowDeleteModal = (proceeding_id: number) => {
		setSelectedID(proceeding_id);
		setShowDeleteModal(true);
	};

	const onDeleteHearing = () => {
		setSuccessText("Deletion of court proceeding is successful");
		dispatch(deleteCourtProceeding(selectedID)).then(() => {
			dispatch(getCourtProceedings());
			setShowDeleteModal(false);
		});
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AddProceeding
				isShow={showAddModal}
				onConfirm={() => console.log("Justine Gwapo")}
				onCancel={() => setShowAddModal(false)}
				selectOptions={currentDocketList}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Court Hearing"
				successText="Creation of new court proceeding is successful"
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="proceeding"
				onConfirm={() => onDeleteHearing()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Court Proceedings" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Court Proceedings
					</h4>
					<div className="flex gap-x-5 items-center">
						<AddNewButton
							btnText="New Proceeding"
							onClickAdd={() => setShowAddModal(true)}
						/>
					</div>
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
					<ProceedingsTable
						courtProceedings={courtProceedingsList}
						onShowWarning={(proceeding_id: number) =>
							onShowDeleteModal(proceeding_id)
						}
					/>
				)}
			</div>
		</div>
	);
};

export default CourtProceedingsView;
