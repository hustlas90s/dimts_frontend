import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	deleteCourtProceeding,
	getCaseProceedings,
	getCurrentDockets,
} from "../../../redux/dataSlice";
import MoonLoader from "react-spinners/MoonLoader";
import PrintButton from "../../../components/PrintButton";
import CaseProceedingsTable from "./CaseProceedingsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import UpdateProceeding from "../../../components/admin/UpdateProceeding";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import ViewProceeding from "../../../components/admin/ViewProceeding";
import { useRouter } from "next/router";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";

const CaseProceedingView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, caseProceedingsList } = useAppSelector(
		(state) => state.dataState
	);

	const {
		viewModal,
		setViewModal,
		showSuccessModal,
		setShowSuccessModal,
		showEditModal,
		setShowEditModal,
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

	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		dispatch(getCurrentDockets());
		dispatch(getCaseProceedings(id));
	}, []);

	const onViewCourtProceeding = (proceeding: any) => {
		setSelectedObject(proceeding);
		setViewModal(true);
	};

	const onShowUpdateModal = (proceeding_id: number) => {
		setSelectedID(proceeding_id);
		const proceeding = caseProceedingsList.find(
			(proceeding: any) => proceeding.id === proceeding_id
		);
		setSelectedObject({
			proceedingID: proceeding.id,
			proceedingSchedule: proceeding.proceeding_schedule,
			proceedingStartTime: proceeding.start_time,
			proceedingEndTime: proceeding.end_time,
			proceedingStatus: proceeding.status,
			proceedingRemarks: proceeding.remarks,
		});
		setShowEditModal(true);
	};

	const onUpdateProceeding = () => {
		dispatch(getCaseProceedings(id));
		setSuccessText("Updating of court hearing schedule is successful");
		setShowSuccessModal(true);
		setShowEditModal(false);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	};

	const onShowDeleteModal = (proceeding_id: number) => {
		setSelectedID(proceeding_id);
		setShowDeleteModal(true);
	};

	const onDeleteHearing = () => {
		dispatch(deleteCourtProceeding(selectedID)).then(() => {
			dispatch(getCaseProceedings(id));
			setShowDeleteModal(false);
		});
	};

	const onExportProceedings = () => {
		const TimeText = (hours_time: number, minutes_time: string) => {
			return hours_time > 12
				? `${hours_time - 12} : ${minutes_time} PM`
				: `${hours_time} : ${minutes_time} AM`;
		};
		const csvProocedings = caseProceedingsList.map((proceeding: any) => {
			let start_time_hour = proceeding.start_time.substring(0, 2) * 1;
			let start_time_minutes = proceeding.start_time.substring(
				3,
				proceeding.start_time.length
			);
			let end_time_hour = proceeding.end_time.substring(0, 2) * 1;
			let end_time_minutes = proceeding.end_time.substring(
				3,
				proceeding.end_time.length
			);
			return {
				case_no: id,
				proceeding_schedule: moment(proceeding.proceeding_schedule).format(
					"ll"
				),
				start_time: TimeText(start_time_hour, start_time_minutes),
				end_time: TimeText(end_time_hour, end_time_minutes),
				status: proceeding.status,
				proceeding_type: proceeding.proceeding_type,
				remarks: proceeding.remarks,
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Court Hearings",
		});
		csvProocedings.length ? csvExporter.generateCsv(csvProocedings) : null;
	};

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<ViewProceeding
				isShow={viewModal}
				onClose={() => setViewModal(false)}
				selectedProceeding={selectedObject}
			/>
			<UpdateProceeding
				isShow={showEditModal}
				onConfirm={() => onUpdateProceeding()}
				onCancel={() => setShowEditModal(false)}
				selectedProceeding={selectedObject}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Court Hearing"
				successText={successText}
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
				<div className="w-full flex justify-between items-center">
					<h4 className="text-xl font-black tracking-wider">{id}</h4>
					<div className="flex gap-x-5 items-center">
						{caseProceedingsList.length > 0 ? (
							<PrintButton onClickPrint={() => onExportProceedings()} />
						) : null}
						<div
							className="flex justify-center items-center gap-x-1 hover:cursor-pointer"
							onClick={() => router.back()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5 text-purple-500"
							>
								<path
									fillRule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
							<p className="text-purple-500 text-sm">Back</p>
						</div>
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
					<CaseProceedingsTable
						caseNo={id}
						caseProceedings={caseProceedingsList}
						onViewProceeding={(proceeding: any) =>
							onViewCourtProceeding(proceeding)
						}
						onShowEdit={(proceeding: any) => onShowUpdateModal(proceeding)}
						onShowWarning={(proceeding_id: number) =>
							onShowDeleteModal(proceeding_id)
						}
					/>
				)}
			</div>
		</div>
	);
};

export default CaseProceedingView;
