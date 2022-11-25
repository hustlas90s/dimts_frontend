import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { createNewDetainee } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface AddRecordParams {
	isShow: boolean;
	addTitle: string;
	addText: string;
	detainedIn: string;
	onConfirm(): void;
	onCancel(): void;
	selectOptions: any;
}

const AddRecord = ({
	isShow,
	addTitle,
	addText,
	detainedIn,
	onConfirm,
	onCancel,
	selectOptions,
}: AddRecordParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		const data = {
			name: `${formData.recordFirstName} ${formData.recordLastName}`,
			date_arrived: formData.recordDateArrived,
			date_released: formData.recordDateReleased
				? formData.recordDateReleased
				: "",
			assigned_personnel: formData.recordPersonnel,
			remarks: formData.recordRemarks,
			detained_in: detainedIn,
			case: formData.recordCase,
		};
		dispatch(createNewDetainee(data)).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle={addTitle}
			addText={addText}
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MyInputField
					control={control}
					fieldLabel="First Name"
					fieldType="text"
					fieldName="recordFirstName"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Last Name"
					fieldType="text"
					fieldName="recordLastName"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Arrived"
					fieldType="date"
					fieldName="recordDateArrived"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Released"
					fieldType="date"
					fieldName="recordDateReleased"
					fieldRules=""
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Assigned Personnel"
					fieldType="text"
					fieldName="recordPersonnel"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MySelectField
					myControl={control}
					myOptions={selectOptions.map((option: any) => {
						return { label: option.case_no, value: option.id };
					})}
					fieldName="recordCase"
					fieldLabel="Case"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<div className="col-span-2">
					<MyTextAreaField
						control={control}
						fieldLabel="Remarks"
						fieldName="recordRemarks"
						fieldRules={fieldRules.requiredRule}
						defaultValue=""
					/>
				</div>
			</div>
		</SubmitModal>
	);
};

export default AddRecord;
