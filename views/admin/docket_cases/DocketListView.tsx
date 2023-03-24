import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteDocket, getPastDockets } from "../../../redux/dataSlice";
import MoonLoader from "react-spinners/MoonLoader";
import DocketListTable from "./DocketListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import ViewDocket from "../../../components/admin/ViewDocket";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import PrintButton from "../../../components/PrintButton";
import moment from "moment";
import { ExportToCsv } from "export-to-csv";
import _ from "lodash";

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
	const [searchInput, setSearchInput] = useState("");
	const [filteredDocket, setFilteredDocket] = useState<any>([]);
	const [filterWithType, setFilterWithType] = useState<any>([]);
	const [isSolved, setIsSolved] = useState(0);

	useEffect(() => {
		dispatch(getPastDockets()).then((res: any) =>
			setFilteredDocket(res.payload)
		);
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
			dispatch(getPastDockets()).then((res: any) =>
				setFilteredDocket(res.payload)
			);
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	const onFilterCases = (status: number) => {
		switch (status) {
			case 0:
				setFilterWithType(pastDocketList);
				let noFilterValues = _.filter(filterWithType, function (docket: any) {
					return docket.case_no.includes(searchInput);
				});
				setFilteredDocket(noFilterValues);
				break;
			case 1:
				setFilterWithType(pastDocketList);
				let solvedValues = _.filter(filterWithType, function (docket: any) {
					return docket.is_solved;
				});
				setFilteredDocket(solvedValues);
				break;
			case 2:
				setFilterWithType(pastDocketList);
				let notSolvedValues = _.filter(filterWithType, function (docket: any) {
					return !docket.is_solved;
				});
				setFilteredDocket(notSolvedValues);
				break;
			default:
				console.log("Unknown value");
				break;
		}
	};

	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		if (e.target.value.length > 0) {
			let filtered_values: any = _.filter(
				pastDocketList,
				function (docket: any) {
					return docket.case_no
						.toLowerCase()
						.includes(e.target.value.toLowerCase());
				}
			);
			setFilteredDocket(filtered_values);
		} else {
			setFilteredDocket(pastDocketList);
		}
	};

	const caseStatusSelection = (status: number): void => {
		setIsSolved(Number(status));
		onFilterCases(Number(status));
	};

	const onExportCases = () => {
		const csvCases = pastDocketList.map((docket: any) => {
			return {
				case_no: docket.case_no,
				type_of_case: docket.type_of_case,
				document_title: docket.document_title,
				case_title: docket.case_title,
				crime_type: docket.crime_type,
				received_date: moment(docket.received_date).format("ll"),
				raffled_court: docket.raffled_court,
				judge_assigned: docket.judge_assigned,
			};
		});
		const csvExporter = new ExportToCsv({
			useKeysAsHeaders: true,
			filename: "Docket Cases",
		});
		csvCases.length ? csvExporter.generateCsv(csvCases) : null;
	};

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
					<div className="flex gap-x-5 items-center">
						<PrintButton onClickPrint={() => onExportCases()} />
						<input
							type="text"
							placeholder="Search Case No."
							className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
							onChange={handleChange}
							value={searchInput}
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
					<DocketListTable
						pastDocketList={filteredDocket}
						onViewDocket={(docket_record: any) =>
							onViewDocketCase(docket_record)
						}
						onShowWarning={(e: number) => onShowWarningModal(e)}
					/>
				)}
				<div className="w-full flex justify-end">
					<select
						className="w-44 py-1 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none"
						onChange={(e: any) => caseStatusSelection(e.target.value)}
						defaultValue={isSolved}
					>
						<option value={0}>All Cases</option>
						<option value={1}>Solved Cases</option>
						<option value={2}>Unsolved Cases</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default CitizenListView;
