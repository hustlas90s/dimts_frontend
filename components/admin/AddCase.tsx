import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewDocket } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";
import { QRCodeCanvas } from "qrcode.react";

interface AddCaseParams {
	isShow: boolean;
	addTitle: string;
	addText: string;
	onConfirm(): void;
	onCancel(): void;
	caseType: string;
}

const AddCase = ({
	isShow,
	addTitle,
	addText,
	onConfirm,
	onCancel,
	caseType,
}: AddCaseParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const [qrValue, setQrValue] = useState<any>();
	const [showLoading, setShowLoading] = useState(false);

	const onSubmit = (formData: any) => {
		let qrImage: any = document.getElementById("qr-gen");
		let qrBase64 = qrImage.toDataURL("image/jpeg");
		console.log(qrBase64);
		setShowLoading(true);
		const data = {
			type_of_case: formData.caseType,
			case_no: formData.caseNo,
			document_title: formData.caseDocTitle,
			case_title: formData.caseTitle,
			crime_type: formData.caseCrimeType,
			received_date: formData.caseReceived,
			hearing_date: formData.caseHearing,
			arraignment_date: formData.caseArraignment,
			initial_trial_date: formData.caseInital,
			last_court_action: formData.caseLastAction,
			raffled_court: formData.caseRaffled,
			judge_assigned: formData.caseJudge,
			case_status: formData.caseStatus,
			qr_code: qrBase64,
			qr_code_tracker: qrValue,
		};
		setTimeout(() => {
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
				<MyInputField
					control={control}
					fieldLabel="Type of Case"
					fieldType="text"
					fieldName="caseType"
					fieldRules={fieldRules.requiredRule}
					defaultValue={caseType}
					readOnly={true}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Case No."
					fieldType="text"
					fieldName="caseNo"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Document Title"
					fieldType="text"
					fieldName="caseDocTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Case Title"
					fieldType="text"
					fieldName="caseTitle"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "Antisocial Behaviour", value: "Antisocial Behaviour" },
						{ label: "Arson", value: "Arson" },
						{ label: "Burglary", value: "Burglary" },
						{ label: "Child Abuse", value: "Child Abuse" },
						{ label: "Crime Abroad", value: "Crime Abroad" },
						{ label: "Cybercrime", value: "Cybercrime" },
						{ label: "Domestic Abuse", value: "Domestic Abuse" },
						{ label: "Fraud", value: "Fraud" },
						{ label: "Hate Crime", value: "Hate Crime" },
						{ label: "Modern Slavery", value: "Modern Slavery" },
						{ label: "Murder", value: "Murder" },
						{ label: "Rape/Sexual Assault", value: "Rape/Sexual Assault" },
						{ label: "Robbery", value: "Robbery" },
						{ label: "Sexual Harassment", value: "Sexual Harassment" },
						{ label: "Stalking", value: "Stalking" },
						{ label: "Terrorism", value: "Terrorism" },
						{ label: "Violent Crime", value: "Violent Crime" },
					]}
					fieldName="caseCrimeType"
					fieldLabel="Crime Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Received Date"
					fieldType="date"
					fieldName="caseReceived"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Hearing Date"
					fieldType="date"
					fieldName="caseHearing"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Arraignment Date"
					fieldType="date"
					fieldName="caseArraignment"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Initial Trial Date"
					fieldType="date"
					fieldName="caseInital"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Raffled Court"
					fieldType="text"
					fieldName="caseRaffled"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Judge Assigned"
					fieldType="text"
					fieldName="caseJudge"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Case Status"
					fieldType="text"
					fieldName="caseStatus"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder=""
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Last Court Action"
						fieldName="caseLastAction"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
						placeHolder=""
					/>
				</div>
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

export default AddCase;
