import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteHearing,
	getCourtHearings,
	getDocketList,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import CourtHearingsTable from "./CourtHearingsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import AddHearing from "../../../components/admin/AddHearing";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import UpdateHearing from "../../../components/admin/UpdateHearing";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const CourtHearingsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, courtHearingList, docketList } = useAppSelector(
		(state: any) => state.dataState
	);

	const {
		showAddModal,
		setShowAddModal,
		showEditModal,
		setShowEditModal,
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
		dispatch(getDocketList());
		dispatch(getCourtHearings());
	}, []);

	const onSubmitNewHearing = useCallback(() => {
		dispatch(getCourtHearings());
		setShowAddModal(false);
		setSuccessText("Addition of new court hearing is successful");
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, []);

	const onShowUpdateModal = (hearing_id: number) => {
		setSelectedID(hearing_id);
		const hearing = courtHearingList.find(
			(hearing: any) => hearing.id === hearing_id
		);
		setSelectedObject({
			hearingID: hearing.id,
			hearingSchedule: hearing.hearing_schedule,
			hearingStartTime: hearing.start_time,
			hearingEndTime: hearing.end_time,
			hearingCaseNo: hearing.case__case_no,
		});
		setShowEditModal(true);
	};

	const onUpdateHearing = () => {
		dispatch(getCourtHearings());
		setSuccessText("Updating of court hearing schedule is successful");
		setShowSuccessModal(true);
		setShowEditModal(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	const onShowDeleteModal = (hearing_id: number) => {
		setSelectedID(hearing_id);
		setShowDeleteModal(true);
	};

	const onDeleteHearing = () => {
		setSuccessText("Deletion of court hearing is successful");
		dispatch(deleteHearing(selectedID)).then(() => {
			dispatch(getCourtHearings());
			setShowDeleteModal(false);
		});
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<AddHearing
				isShow={showAddModal}
				onConfirm={() => onSubmitNewHearing()}
				onCancel={() => setShowAddModal(false)}
				selectOptions={docketList}
			/>
			<UpdateHearing
				isShow={showEditModal}
				onConfirm={() => onUpdateHearing()}
				onCancel={() => setShowEditModal(false)}
				selectedHearing={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Court Hearing"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showDeleteModal}
				warningText="hearing"
				onConfirm={() => onDeleteHearing()}
				onCancel={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Court Hearings" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">Court Hearings</h4>
					<AddNewButton
						btnText="New Hearing"
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
					<CourtHearingsTable
						courtHearings={courtHearingList}
						onShowWarning={(hearing_id: number) =>
							onShowDeleteModal(hearing_id)
						}
						onShowEdit={(hearing_id: number) => onShowUpdateModal(hearing_id)}
					/>
				)}
			</div>
		</div>
	);
};

export default CourtHearingsView;
