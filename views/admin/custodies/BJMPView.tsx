import { useCallback, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import AddNewButton from "../../../components/AddNewButton";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import BJMPTable from "./BJMPTable";
import { deleteDetainee, getBJMPDetainees } from "../../../redux/dataSlice";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import AddRecord from "../../../components/admin/AddRecord";
import ViewRecord from "../../../components/admin/ViewRecord";
import UpdateRecord from "../../../components/admin/UpdateRecord";

const BJMPView = () => {
  const dispatch = useAppDispatch();
  const { dataLoading, bjmpRecords, docketList } = useAppSelector(
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

  const onUpdateHearing = () => {
    dispatch(getBJMPDetainees());
    setSuccessText("Updating of BJMP record is successful");
    setShowSuccessModal(true);
    setShowEditModal(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const onSubmitNewRecord = useCallback(() => {
    dispatch(getBJMPDetainees());
    setSuccessText("Creation of new BJMP record is successful");
    setShowAddModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  }, [showAddModal]);

  const onDeleteRecord = useCallback(() => {
    setSuccessText("Deletion of BJMP record is successful");
    dispatch(deleteDetainee(selectedID)).then(() => {
      dispatch(getBJMPDetainees());
      setShowWarningModal(false);
      setShowDeleteModal(true);
      setTimeout(() => {
        setShowDeleteModal(false);
      }, 3000);
    });
  }, [showDeleteModal, showWarningModal]);

  useEffect(() => {
    dispatch(getBJMPDetainees());
  }, []);

  return (
    <div className="flex flex-col gap-y-5 font-mont text-gray-700">
      <ViewRecord
        isShow={viewModal}
        viewTitle="BJMP Custody"
        viewText="View BJMP record details"
        onClose={() => setViewModal(false)}
        selectedRecord={selectedObject}
      />
      <AddRecord
        isShow={showAddModal}
        addTitle="BJMP Custody"
        addText="Create new BJMP record"
        detainedIn="pnp"
        onConfirm={() => onSubmitNewRecord()}
        onCancel={() => setShowAddModal(false)}
        selectOptions={docketList}
      />
      <UpdateRecord
        isShow={showEditModal}
        editTitle="BJMP Custody"
        editText="Update BJMP record"
        onConfirm={() => onUpdateHearing()}
        onCancel={() => setShowEditModal(false)}
        selectedRecord={selectedObject}
      />
      <SuccessModal
        isShow={showSuccessModal}
        successTitle="BJMP Custody"
        successText={successText}
        onConfirm={() => setShowSuccessModal(false)}
      />
      <WarningModal
        isShow={showWarningModal}
        warningText="BJMP record"
        onConfirm={() => onDeleteRecord()}
        onCancel={() => setShowWarningModal(false)}
      />
      <DeletedModal
        isShow={showDeleteModal}
        deletedTitle="BJMP Custody"
        deletedText={successText}
        onConfirm={() => setShowDeleteModal(false)}
      />
      <AdminBreadCrumbs activeText="BJMP" />
      <div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
        {/*  */}
        <div className="w-full flex justify-between">
          <h4 className="text-xl font-black tracking-wider">BJMP Custody</h4>
          <AddNewButton
            btnText="New Record"
            onClickAdd={() => console.log("BJMP")}
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
        {!dataLoading && <BJMPTable bjmpRecords={bjmpRecords} />}
      </div>
    </div>
  );
};

export default BJMPView;
