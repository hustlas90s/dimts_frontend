import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyInputFieldFull from "../MyInputFieldFull";
import MySelectField from "../MySelectField";
import { useForm, useWatch } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateHearing, updateDocket } from "../../redux/dataSlice";
import { useState, useEffect } from "react";

interface UpdateHearingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedHearing: any;
	docketList: any;
}

const UpdateHearing = ({
	isShow,
	onConfirm,
	onCancel,
	selectedHearing,
	docketList,
}: UpdateHearingParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();
	const [caseDetails, setCaseDetails] = useState<any>();

	const onCloseCase = (
		hearingIsClosed: any,
		hearingImprisonment: any,
		hearingStatus: any
	) => {
		if (hearingIsClosed !== undefined && hearingIsClosed) {
			let solved = hearingStatus === "Completed" ? true : false;
			dispatch(
				updateDocket({
					formData: {
						is_closed: hearingIsClosed,
						imprisonment_span: hearingImprisonment,
						is_solved: solved,
					},
					docket_id: caseDetails?.id,
				})
			);
			return;
		}
	};

	const onSubmit = (formData: any) => {
		if (
			Object.entries(selectedHearing).toString() ===
			Object.entries(formData).toString()
		) {
			onCancel();
			return;
		}
		const data = {
			hearing_schedule: formData.hearingSchedule,
			hearing_type: formData.hearingType,
			start_time: formData.hearingStartTime,
			end_time: formData.hearingEndTime,
			status: formData.hearingStatus,
		};
		formData?.hearingIsClosed !== undefined
			? onCloseCase(
					formData?.hearingIsClosed,
					formData?.hearingImprisonment,
					formData.hearingStatus
			  )
			: null;
		dispatch(
			updateHearing({ formData: data, hearing_id: selectedHearing.hearingID })
		).then(() => onConfirm());
	};

	const hearingType = useWatch({
		control,
		name: "hearingType",
		defaultValue: "Hearing",
	});

	useEffect(() => {
		console.log("Hearing: ", selectedHearing);
		const currentCase = docketList.find(
			(docket: any) => docket.case_no === selectedHearing.hearingCaseNo
		);
		console.log("Current case: ", currentCase);
		setCaseDetails(currentCase);
	}, [isShow]);

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Court Hearing"
			addText="Update court hearing schedule"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<div className="hidden">
					<MyInputField
						control={control}
						fieldLabel=""
						fieldType="hidden"
						fieldName="hearingID"
						fieldRules=""
						defaultValue={selectedHearing.hearingID}
						placeHolder=""
						setFieldValue={setValue}
					/>
				</div>
				<MyInputFieldFull
					control={control}
					fieldLabel="Case No."
					fieldType="text"
					fieldName="hearingCaseNo"
					fieldRules=""
					defaultValue={selectedHearing.hearingCaseNo}
					placeHolder=""
					readOnly={true}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Hearing Schedule"
					fieldType="date"
					fieldName="hearingSchedule"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingSchedule}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "Hearing", value: "Hearing" },
						{ label: "Arraignment", value: "Arraignment" },
						{ label: "Initial Trial", value: "Initial Trial" },
						{ label: "Last Court Action", value: "Last Court Action" },
					]}
					fieldName="hearingType"
					fieldLabel="Hearing Type"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingType}
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="Start Time"
					fieldType="time"
					fieldName="hearingStartTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingStartTime}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MyInputField
					control={control}
					fieldLabel="End Time"
					fieldType="time"
					fieldName="hearingEndTime"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingEndTime}
					placeHolder=""
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={[
						{ label: "Pending", value: "Pending" },
						{ label: "Canceled", value: "Canceled" },
						{ label: "Completed", value: "Completed" },
					]}
					fieldName="hearingStatus"
					fieldLabel="Status"
					fieldRules={fieldRules.requiredRule}
					defaultValue={selectedHearing.hearingStatus}
					setFieldValue={setValue}
				/>
				{hearingType.toLowerCase() === "last court action" && (
					<MySelectField
						myControl={control}
						myOptions={[
							{ label: "Yes", value: true },
							{ label: "No", value: false },
						]}
						fieldName="hearingIsClosed"
						fieldLabel="Close Case?"
						fieldRules={fieldRules.requiredRule}
						defaultValue={caseDetails?.is_closed}
						setFieldValue={setValue}
					/>
				)}
				{hearingType.toLowerCase() === "last court action" && (
					<MyInputField
						control={control}
						fieldLabel="Imprisonment"
						fieldType="number"
						fieldName="hearingImprisonment"
						fieldRules={fieldRules.requiredNumberRule}
						defaultValue={caseDetails?.imprisonment_span ?? 0}
						placeHolder=""
						setFieldValue={setValue}
					/>
				)}
			</div>
		</SubmitModal>
	);
};

export default UpdateHearing;
