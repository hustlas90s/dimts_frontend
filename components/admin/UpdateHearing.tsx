import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MyInputFieldFull from "../MyInputFieldFull";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateHearing } from "../../redux/dataSlice";

interface UpdateHearingParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectedHearing: any;
}

const UpdateHearing = ({
	isShow,
	onConfirm,
	onCancel,
	selectedHearing,
}: UpdateHearingParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

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
			start_time: formData.hearingStartTime,
			end_time: formData.hearingEndTime,
		};
		dispatch(
			updateHearing({ formData: data, hearing_id: selectedHearing.hearingID })
		).then(() => onConfirm());
	};

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
				<div className="col-span-2">
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
				</div>
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
					defaultValue=""
				/>
			</div>
		</SubmitModal>
	);
};

export default UpdateHearing;
