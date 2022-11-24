import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteDocket, getCivilCases } from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import CivilCaseTable from "./CivilCaseTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewCase from "../../../components/admin/ViewCase";
import AddCase from "../../../components/admin/AddCase";
import UpdateCase from "../../../components/admin/UpdateCase";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const CivilCaseListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, civilCaseList } = useAppSelector(
		(state: any) => state.dataState
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

	const onViewCivilCase = (civil_record: any) => {
		setSelectedObject(civil_record);
		console.log("Civil record: ", civil_record);
		console.log("Selected object: ", selectedObject);
		setViewModal(true);
	};

	const onSubmitNewCase = useCallback(() => {
		dispatch(getCivilCases());
		setSuccessText("Creation of new civil record is successful");
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowUpdateModal = (crime_id: number) => {
		setSelectedID(crime_id);
		const crime = civilCaseList.find((crime: any) => crime.id === crime_id);
		setSelectedObject({
			caseType: crime.type_of_case,
			caseNo: crime.case_no,
			caseDocTitle: crime.document_title,
			caseTitle: crime.case_title,
			caseCrimeType: crime.crime_type,
			caseReceived: crime.received_date,
			caseHearing: crime.hearing_date,
			caseArraignment: crime.arraignment_date,
			caseInital: crime.initial_trial_date,
			caseRaffled: crime.raffled_court,
			caseJudge: crime.judge_assigned,
			caseStatus: crime.case_status,
			caseLastAction: crime.last_court_action,
		});
		setShowEditModal(true);
	};

	const onUpdateCase = () => {
		dispatch(getCivilCases());
		setSuccessText("Updating of civil record is successful");
		setShowSuccessModal(true);
		setShowEditModal(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	const onShowWarningModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowWarningModal(true);
	};

	const onDeleteCase = useCallback(() => {
		setSuccessText("Deletion of civil record is successful");
		dispatch(deleteDocket(selectedID)).then(() => {
			dispatch(getCivilCases());
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	useEffect(() => {
		dispatch(getCivilCases());
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewCase
				isShow={viewModal}
				viewTitle="Civil Case"
				viewText="View civil record details"
				onClose={() => setViewModal(false)}
				selectedCase={selectedObject}
			/>
			<AddCase
				isShow={showAddModal}
				addTitle="Civil Case"
				addText="Create new civil record"
				onConfirm={() => onSubmitNewCase()}
				onCancel={() => setShowAddModal(false)}
				caseType="Civil"
			/>
			<UpdateCase
				isShow={showEditModal}
				onConfirm={() => onUpdateCase()}
				onCancel={() => setShowEditModal(false)}
				caseType="Civil"
				selectedID={selectedID}
				selectedCase={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Civil Case"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="civil case"
				onConfirm={() => onDeleteCase()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="Civil Case"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Civil Cases" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Civil Cases</h4>
					<AddNewButton
						btnText="New Case"
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
					<CivilCaseTable
						civilCases={civilCaseList}
						onViewCase={(civil_record: any) => onViewCivilCase(civil_record)}
						onShowWarning={(civil_id: number) => onShowWarningModal(civil_id)}
						onShowEdit={(civild_id: number) => onShowUpdateModal(civild_id)}
					/>
				)}
			</div>
		</div>
	);
};

export default CivilCaseListView;
