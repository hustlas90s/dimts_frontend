import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteHearing,
	getCourtHearings,
	getCurrentDockets,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import PrintButton from "../../../components/PrintButton";
import MoonLoader from "react-spinners/MoonLoader";
import CourtHearingsTable from "./CourtHearingsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewHearing from "../../../components/admin/ViewHearing";
import AddHearing from "../../../components/admin/AddHearing";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import UpdateHearing from "../../../components/admin/UpdateHearing";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";

const CourtHearingsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, courtHearingList, currentDocketList } = useAppSelector(
		(state: any) => state.dataState
	);

	const {
		viewModal,
		setViewModal,
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
		dispatch(getCurrentDockets());
		dispatch(getCourtHearings());
	}, []);

	const onSubmitNewHearing = useCallback(() => {
		dispatch(getCourtHearings());
		setShowAddModal(false);
		setSuccessText("Creation of new court hearing is successful");
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, []);

	const onViewCourtHearing = (hearing: any) => {
		setSelectedObject(hearing);
		setViewModal(true);
	};

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

	const onExportHearings = () => {
		const TimeText = (hours_time: number, minutes_time: string) => {
			return hours_time > 12
				? `${hours_time - 12} : ${minutes_time} PM`
				: `${hours_time} : ${minutes_time} AM`;
		};
		const csvHearings = courtHearingList.map((hearing: any) => {
			let start_time_hour = hearing.start_time.substring(0, 2) * 1;
			let start_time_minutes = hearing.start_time.substring(
				3,
				hearing.start_time.length
			);
			let end_time_hour = hearing.end_time.substring(0, 2) * 1;
			let end_time_minutes = hearing.end_time.substring(
				3,
				hearing.end_time.length
			);
			return {
				type_of_case: hearing.case__type_of_case,
				crime_type: hearing.case__crime_type,
				case_no: hearing.case__case_no,
				document_title: hearing.case__document_title,
				case_title: hearing.case__case_title,
				hearing_schedule: moment(hearing.hearing_schedule).format("ll"),
				start_time: TimeText(start_time_hour, start_time_minutes),
				end_time: TimeText(end_time_hour, end_time_minutes),
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Court Hearings",
		});
		csvExporter.generateCsv(csvHearings);
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewHearing
				isShow={viewModal}
				onClose={() => setViewModal(false)}
				selectedHearing={selectedObject}
			/>
			<AddHearing
				isShow={showAddModal}
				onConfirm={() => onSubmitNewHearing()}
				onCancel={() => setShowAddModal(false)}
				selectOptions={currentDocketList}
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
					<div className="flex gap-x-5 items-center">
						<PrintButton onClickPrint={() => onExportHearings()} />
						<AddNewButton
							btnText="New Hearing"
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
					<CourtHearingsTable
						courtHearings={courtHearingList}
						onViewHearing={(hearing: any) => onViewCourtHearing(hearing)}
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
