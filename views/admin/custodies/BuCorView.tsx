import { useCallback, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import AddNewButton from "../../../components/AddNewButton";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import BuCorTable from "./BuCorTable";
import { deleteDetainee, getBuCorDetainees } from "../../../redux/dataSlice";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import DeletedModal from "../../../components/DeletedModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";
import AddRecord from "../../../components/admin/AddRecord";
import ViewRecord from "../../../components/admin/ViewRecord";
import UpdateRecord from "../../../components/admin/UpdateRecord";

const BuCorView = () => {
  const dispatch = useAppDispatch();
  const { dataLoading, bucorRecords, docketList } = useAppSelector(
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
    dispatch(getBuCorDetainees());
    setSuccessText("Updating of Bucor record is successful");
    setShowSuccessModal(true);
    setShowEditModal(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const onSubmitNewRecord = useCallback(() => {
    dispatch(getBuCorDetainees());
    setSuccessText("Creation of new Bucor record is successful");
    setShowAddModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  }, [showAddModal]);

  const onDeleteRecord = useCallback(() => {
    setSuccessText("Deletion of Bucor record is successful");
    dispatch(deleteDetainee(selectedID)).then(() => {
      dispatch(getBuCorDetainees());
      setShowWarningModal(false);
      setShowDeleteModal(true);
      setTimeout(() => {
        setShowDeleteModal(false);
      }, 3000);
    });
  }, [showDeleteModal, showWarningModal]);

  useEffect(() => {
    dispatch(getBuCorDetainees());
  }, []);

  return (
    <div className="flex flex-col gap-y-5 font-mont text-gray-700">
      <ViewRecord
        isShow={viewModal}
        viewTitle="Bucor Custody"
        viewText="View Bucor record details"
        onClose={() => setViewModal(false)}
        selectedRecord={selectedObject}
      />
      <AddRecord
        isShow={showAddModal}
        addTitle="Bucor Custody"
        addText="Create new Bucor record"
        detainedIn="pnp"
        onConfirm={() => onSubmitNewRecord()}
        onCancel={() => setShowAddModal(false)}
        selectOptions={docketList}
      />
      <UpdateRecord
        isShow={showEditModal}
        editTitle="Bucor Custody"
        editText="Update Bucor record"
        onConfirm={() => onUpdateHearing()}
        onCancel={() => setShowEditModal(false)}
        selectedRecord={selectedObject}
      />
      <SuccessModal
        isShow={showSuccessModal}
        successTitle="Bucor Custody"
        successText={successText}
        onConfirm={() => setShowSuccessModal(false)}
      />
      <WarningModal
        isShow={showWarningModal}
        warningText="Bucor record"
        onConfirm={() => onDeleteRecord()}
        onCancel={() => setShowWarningModal(false)}
      />
      <DeletedModal
        isShow={showDeleteModal}
        deletedTitle="Bucor Custody"
        deletedText={successText}
        onConfirm={() => setShowDeleteModal(false)}
      />
      <AdminBreadCrumbs activeText="BuCor" />
      <div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
        {/*  */}
        <div className="w-full flex justify-between">
          <h4 className="text-xl font-black tracking-wider">BuCor Custody</h4>
          <AddNewButton
            btnText="New Record"
            onClickAdd={() => console.log("BuCor")}
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
        {!dataLoading && <BuCorTable bucorRecords={bucorRecords} />}
      </div>
    </div>
  );
};

export default BuCorView;
