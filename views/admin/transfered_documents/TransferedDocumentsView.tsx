import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	sendDocumentEmail,
	getTransferedDocuments,
	getOfficesList,
	getDocketList,
	deleteDocument,
} from "../../../redux/dataSlice";
import MoonLoader from "react-spinners/MoonLoader";
import TransferedDocumentsTable from "./TransferedDocumentsTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import SendDocument from "../../../components/admin/SendDocument";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const ServedDocsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, transferedDocuments, officesList, docketList } =
		useAppSelector((state) => state.dataState);
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
		dispatch(getTransferedDocuments());
		dispatch(getOfficesList());
		dispatch(getDocketList());
	}, []);

	const onSubmitNewDocument = useCallback(() => {
		dispatch(getTransferedDocuments());
		setSuccessText("Sending of document is successful");
		setShowAddModal(false);
		setShowSuccessModal(true);
		setTimeout(() => {
			setShowSuccessModal(false);
		}, 3000);
	}, [showAddModal]);

	const onShowWarningModal = (account_id: number) => {
		setSelectedID(account_id);
		setShowWarningModal(true);
	};

	const onDeleteDocument = useCallback(() => {
		setSuccessText("Deletion of transfered document is successful");
		dispatch(deleteDocument(selectedID)).then(() => {
			dispatch(getTransferedDocuments());
			setShowWarningModal(false);
			setShowDeleteModal(true);
			setTimeout(() => {
				setShowDeleteModal(false);
			}, 3000);
		});
	}, [showDeleteModal, showWarningModal]);

	return (
		<div className="flex flex-col gap-y-5 font-mont text-gray-700">
			<SendDocument
				isShow={showAddModal}
				onConfirm={() => onSubmitNewDocument()}
				onCancel={() => setShowAddModal(false)}
				officeOptions={officesList}
				caseOptions={docketList}
			/>
			<SuccessModal
				isShow={showSuccessModal}
				successTitle="Transfered Documents"
				successText={successText}
				onConfirm={() => setShowSuccessModal(false)}
			/>
			<WarningModal
				isShow={showWarningModal}
				warningText="document"
				onConfirm={() => onDeleteDocument()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<DeletedModal
				isShow={showDeleteModal}
				deletedTitle="Transfered Document"
				deletedText={successText}
				onConfirm={() => setShowDeleteModal(false)}
			/>
			<AdminBreadCrumbs activeText="Transfered Documents" />
			<div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-black tracking-wider">
						Transfered Documents
					</h4>
					{/*  */}
					<button
						type="button"
						className={`bg-purple-600 hover:bg-purple-500 px-3 py-2 text-white font-semibold rounded-lg transition-colors ease-out duration-200 flex items-center gap-x-2`}
						onClick={() => setShowAddModal(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>

						<p className="text-sm tracking-wider">Send Document</p>
					</button>
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
					<TransferedDocumentsTable
						transaferedDocuments={transferedDocuments}
						onShowWarning={(e: number) => onShowWarningModal(e)}
					/>
				)}
			</div>
		</div>
	);
};

export default ServedDocsView;