import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    deleteAccount,
    getOfficesList,
    getProvinces,
} from "../../../redux/dataSlice";
import AddNewButton from "../../../components/AddNewButton";
import MoonLoader from "react-spinners/MoonLoader";
import OfficeListTable from "./OfficeListTable";
import AdminBreadCrumbs from "../../../components/admin/AdminBreadCrumbs";
import RegisterOffice from "../../../components/admin/RegisterOffice";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";
import useCrudModals from "../../../hooks/useCrudModals";
import useModalIDs from "../../../hooks/useModalIDs";

const OfficeListView = () => {
    const dispatch = useAppDispatch();
    const { dataLoading, provinceList, officesList } = useAppSelector(
        (state: any) => state.dataState
    );
    const {
        showAddModal,
        setShowAddModal,
        showSuccessModal,
        setShowSuccessModal,
        showDeleteModal,
        setShowDeleteModal,
    } = useCrudModals();
    const { selectedID, setSelectedID } = useModalIDs();
    const [searchInput, setSearchInput] = useState("");
    const [filteredOffice, setFilteredOffice] = useState([]);

    useEffect(() => {
        dispatch(getOfficesList()).then(() => {
            setFilteredOffice(officesList);
        });
        dispatch(getProvinces());
    }, []);

    const onSubmitNewAccount = useCallback(() => {
        dispatch(getOfficesList()).then(() => setFilteredOffice(officesList));
        setShowAddModal(false);
        setShowSuccessModal(true);
        setTimeout(() => {
            setShowSuccessModal(false);
        }, 3000);
    }, []);

    const onShowDeleteModal = (account_id: number) => {
        setSelectedID(account_id);
        setShowDeleteModal(true);
    };

    const onDeleteAccount = () => {
        dispatch(deleteAccount(selectedID)).then(() => {
            dispatch(getOfficesList()).then(() =>
                setFilteredOffice(officesList)
            );
            setShowDeleteModal(false);
        });
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        if (searchInput.length > 0) {
            const filtered_list = officesList.filter((office: any) => {
                return office.province
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredOffice(filtered_list);
        } else {
            setFilteredOffice(officesList);
        }
    };

    return (
        <div className="flex flex-col gap-y-5 font-mont text-gray-700">
            <RegisterOffice
                isShow={showAddModal}
                onConfirm={() => onSubmitNewAccount()}
                onCancel={() => setShowAddModal(false)}
                selectOptions={provinceList}
            />
            <SuccessModal
                isShow={showSuccessModal}
                successTitle="Offices Account"
                successText="New offices account registered successfully"
                onConfirm={() => setShowSuccessModal(false)}
            />
            <WarningModal
                isShow={showDeleteModal}
                warningText="office account"
                onConfirm={() => onDeleteAccount()}
                onCancel={() => setShowDeleteModal(false)}
            />
            <AdminBreadCrumbs activeText="Offices Accounts" />
            <div className="w-full bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
                {/*  */}
                <div className="w-full flex justify-between">
                    <h4 className="text-xl font-black tracking-wider">
                        Offices Accounts
                    </h4>
                    <div className="flex flex-row gap-x-3">
                        <AddNewButton
                            btnText="New Account"
                            onClickAdd={() => setShowAddModal(true)}
                        />
                        <input
                            type="text"
                            placeholder="Search by province"
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
                    <OfficeListTable
                        officeList={filteredOffice}
                        onShowWarning={(e: number) => onShowDeleteModal(e)}
                    />
                )}
            </div>
        </div>
    );
};

export default OfficeListView;
