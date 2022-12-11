import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "../../components/ImageUploader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getOfficeDocuments, updateDocument } from "../../redux/dataSlice";
import { fieldRules } from "../../components/authHelper";
import InputWithSubmit from "../../components/InputWithSubmit";
import MoonLoader from "react-spinners/MoonLoader";
import OfficeDocumentsTable from "./OfficeDocumentsTable";

const OfficeView = () => {
    const dispatch = useAppDispatch();
    const { dataLoading, officeDocuments } = useAppSelector(
        (state) => state.dataState
    );
    const { userProfile } = useAppSelector((state) => state.authState);

    const { handleSubmit, control } = useForm();

    useEffect(() => {
        dispatch(getOfficeDocuments());
    }, []);

    const onSubmitQrTracker = (formData: any) => {
        console.log(formData.officeQrTracker);
        dispatch(updateDocument(formData));
    };

    return (
        <div className="min-h-screen flex flex-col items-center gap-y-20 font-mont text-gray-700">
            <div className="w-[80%] bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg mt-10">
                <h4 className="text-xl font-black tracking-wider">
                    {userProfile.first_name}
                </h4>
                <div className="w-full border-b border-gray-200 -mt-3"></div>
                <div className="w-full flex flex-col items-center gap-y-5 py-5">
                    <div className="flex items-center gap-x-5">
                        <div className="w-20 border-b border-gray-400"></div>
                        <p className="text-sm">Enter QR Code Tracker</p>
                        <div className="w-20 border-b border-gray-400"></div>
                    </div>
                    <InputWithSubmit
                        control={control}
                        fieldType="text"
                        fieldName="officeQrTracker"
                        fieldRules={fieldRules.requiredRule}
                        placeHolder="QR Code Tracker"
                        onClickSubmit={handleSubmit(onSubmitQrTracker)}
                    />
                </div>
            </div>
            <div className="w-[80%] bg-white font-mont flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
                <h4 className="text-xl font-black tracking-wider">
                    Transfered Documents
                </h4>
                <div className="w-full border-b border-gray-200 -mt-3"></div>
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
                    <OfficeDocumentsTable officeDocuments={officeDocuments} />
                )}
            </div>
        </div>
    );
};

export default OfficeView;
