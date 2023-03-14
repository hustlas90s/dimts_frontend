import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyMultiSelectField from "../MyMultiSelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewDocket } from "../../redux/dataSlice";
import { QRCodeCanvas } from "qrcode.react";
import MyInputFieldFull from "../MyInputFieldFull";

interface AddCriminalCaseParams {
	isShow: boolean;
	addTitle: string;
	addText: string;
	onConfirm(): void;
	onCancel(): void;
}

const AddCriminalCase = ({
	isShow,
	addTitle,
	addText,
	onConfirm,
	onCancel,
}: AddCriminalCaseParams) => {
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
			judge_assigned: formData.caseJudge,
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
						defaultValue="Criminal"
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
				/>
				<MyMultiSelectField
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

export default AddCriminalCase;
