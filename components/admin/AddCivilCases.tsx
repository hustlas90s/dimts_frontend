import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyInputFieldFull from "../MyInputFieldFull";
import MyMultiSelectField from "../MyMultiSelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewDocket } from "../../redux/dataSlice";
import { QRCodeCanvas } from "qrcode.react";
import MyCreatableSelect from "../MyCreatableSelect";

interface AddCivilCaseParams {
	isShow: boolean;
	addTitle: string;
	addText: string;
	onConfirm(): void;
	onCancel(): void;
}

const AddCivilCase = ({
	isShow,
	addTitle,
	addText,
	onConfirm,
	onCancel,
}: AddCivilCaseParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const [qrValue, setQrValue] = useState<any>();
	const [showLoading, setShowLoading] = useState(false);

	const onSubmit = (formData: any) => {
		let qrImage: any = document.getElementById("qr-gen");
		let qrBase64 = qrImage.toDataURL("image/jpeg");
		setShowLoading(true);
		const crimes = formData.caseCrimeType.map((crime: any) => {
			return crime.value;
		});
		const data = {
			type_of_case: formData.caseType,
			case_no: formData.caseNo,
			document_title: formData.caseDocTitle,
			case_title: formData.caseTitle,
			crime_type: JSON.stringify(crimes),
			received_date: formData.caseReceived,
			raffled_court: formData.caseRaffled,
			judge_assigned: formData.caseJudge.value,
			qr_code: qrBase64,
			qr_code_tracker: qrValue,
		};
		setTimeout(() => {
			console.log(data);
			dispatch(createNewDocket(data)).then(() => {
				setShowLoading(false);
				onConfirm();
			});
		}, 1000);
	};

	useEffect(() => {
		setQrValue(nanoid());
	}, [onConfirm, onCancel]);

	return (
		<SubmitModal
			isShow={isShow}
			addTitle={addTitle}
			addText={addText}
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
			loadingState={showLoading}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="hidden col-span-2">
					<MyInputField
						control={control}
						fieldLabel="Type of Case"
						fieldType="text"
						fieldName="caseType"
						fieldRules={fieldRules.requiredRule}
						defaultValue="Civil"
						readOnly={true}
						setFieldValue={setValue}
					/>
				</div>
				<MyInputFieldFull
					control={control}
					fieldLabel="Case No."
					fieldType="text"
					fieldName="caseNo"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyMultiSelectField
					myControl={control}
					myOptions={[
						{ label: "Tort Claims", value: "Tort Claims" },
						{ label: "Contract Disputes", value: "Contract Disputes" },
						{ label: "Equitable Claims", value: "Equitable Claims" },
						{
							label: "Landlord/Tenant Issues",
							value: "Landlord/Tenant Issues",
						},
						{
							label: "Complaints Against the City",
							value: "Complaints Against the City",
						},
					]}
					fieldName="caseCrimeType"
					fieldLabel="Civil Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Document Title"
					fieldType="text"
					fieldName="caseDocTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Case Title"
					fieldType="text"
					fieldName="caseTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Received Date"
					fieldType="date"
					fieldName="caseReceived"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
					setFieldValue={setValue}
				/>
				<div className="hidden">
					<MyInputField
						control={control}
						fieldLabel="Raffled Court"
						fieldType="hidden"
						fieldName="caseRaffled"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
						placeHolder=""
						setFieldValue={setValue}
					/>
				</div>
				<MyCreatableSelect
					myControl={control}
					myOptions={[
						{ label: "Hon. Carmel Gil Grado", value: "Hon. Carmel Gil Grado" },
						{ label: "Hon. Gemma Betonio", value: "Hon. Gemma Betonio" },
						{
							label: "Hon. Dorothy Montejo-Gonzaga",
							value: "Hon. Dorothy Montejo-Gonzaga",
						},
					]}
					fieldName="caseJudge"
					fieldLabel="Judge Assigned"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					setFieldValue={setValue}
				/>
				<div className="col-span-2">
					<div className="flex flex-col gap-y-1">
						<p className="font-semibold text-sm text-gray-700">
							QRCode Preview
						</p>
						<div className="w-full h-auto bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center">
							<QRCodeCanvas
								id="qr-gen"
								value={qrValue}
								size={300}
								level={"H"}
								className="self-center py-5"
							/>
						</div>
					</div>
				</div>
			</div>
		</SubmitModal>
	);
};

export default AddCivilCase;
