import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyInputFieldFull from "../MyInputFieldFull";
import MySelectField from "../MySelectField";
import { useForm, useWatch } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateHearing, updateDocket } from "../../redux/dataSlice";
import { useState, useEffect } from "react";
import db from "../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

interface UpdateHearingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedHearing: any;
	docketList: any;
	showCourtHearing: any;
}

const UpdateHearing = ({
	isShow,
	onConfirm,
	onCancel,
	selectedHearing,
	docketList,
	showCourtHearing,
}: UpdateHearingParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();
	const [caseDetails, setCaseDetails] = useState<any>();

	const onCloseCase = (hearingIsClosed: any, hearingImprisonment: any) => {
		let solved = hearingIsClosed.toString() === "true" ? true : false;
		if (hearingIsClosed !== undefined && solved) {
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

	const onUpdateHearing = (data: any, activityRef: any, newActivity: any) => {
		dispatch(
			updateHearing({ formData: data, hearing_id: selectedHearing.hearingID })
		).then(() => {
			try {
				if (data.hearing_type === "Last Court Action") {
					setDoc(activityRef, newActivity);
				}
				console.log("Hearing Updated");
			} catch (error) {
				console.log(error);
			}
			onConfirm();
		});
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
		const newActivity = {
			activity_description: "New case forwarded to docket case",
			activity_name: "Case",
			activity_type: "case",
		};
		const collectionRef = collection(db, "activity-logs");
		const activityRef = doc(collectionRef);
		formData?.hearingIsClosed !== undefined
			? onCloseCase(formData?.hearingIsClosed, formData?.hearingImprisonment)
			: null;

		if (formData?.hearingIsClosed === undefined) {
			onUpdateHearing(data, activityRef, newActivity);
		} else if (
			formData?.hearingIsClosed !== undefined &&
			formData.hearingIsClosed.toString() === "true"
		) {
			onUpdateHearing(data, activityRef, newActivity);
		} else if (
			formData?.hearingIsClosed !== undefined &&
			formData.hearingIsClosed.toString() === "false"
		) {
			localStorage.courtHearingData = formData;
			localStorage.courtHearingId = caseDetails?.id;
			showCourtHearing();
		}
	};

	const hearingType = useWatch({
		control,
		name: "hearingType",
		defaultValue: "Hearing",
	});

	const hearingStatus = useWatch({
		control,
		name: "hearingStatus",
		defaultValue: "Pending",
	});

	useEffect(() => {
		const currentCase = docketList.find(
			(docket: any) => docket.case_no === selectedHearing.hearingCaseNo
		);
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
					fieldRules={fieldRules.requiredWeekDayRule}
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
				{hearingType.toLowerCase() === "last court action" &&
					hearingStatus.toLowerCase() === "completed" && (
						<div className="col-span-2 grid grid-cols-2 gap-y-8 gap-x-5">
							<MySelectField
								myControl={control}
								myOptions={[
									{ label: "Yes", value: true },
									{ label: "No", value: false },
								]}
								fieldName="hearingIsClosed"
								fieldLabel="Close Case?"
								fieldRules={fieldRules.requiredRule}
								defaultValue={
									caseDetails?.is_closed !== undefined
										? caseDetails?.is_closed
										: ""
								}
								setFieldValue={setValue}
							/>
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
						</div>
					)}
			</div>
		</SubmitModal>
	);
};

export default UpdateHearing;
