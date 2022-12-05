import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { sendDocumentEmail } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface SendDocumentParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	officeOptions: any;
	caseOptions: any;
}

const SendDocument = ({
	isShow,
	onConfirm,
	onCancel,
	officeOptions,
	caseOptions,
}: SendDocumentParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		const data = {
			office: formData.documentOffice,
			date_received: formData.documentDate,
			case: formData.documentCase,
			status: formData.documentStatus,
		};
		dispatch(sendDocumentEmail(data)).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Transfered Documents"
			addText="Send new document"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MySelectField
					myControl={control}
					myOptions={officeOptions.map((option: any) => {
						return { label: option.first_name, value: option.id };
					})}
					fieldName="documentOffice"
					fieldLabel="Office"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MySelectField
					myControl={control}
					myOptions={caseOptions.map((option: any) => {
						return { label: option.case_no, value: option.id };
					})}
					fieldName="documentCase"
					fieldLabel="Office"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Date Submitted"
					fieldType="date"
					fieldName="documentDate"
					fieldRules={fieldRules.requiredRule}
				/>
				<MyInputField
					control={control}
					fieldLabel="Status"
					fieldType="text"
					fieldName="documentStatus"
					fieldRules={fieldRules.requiredRule}
					defaultValue="Pending"
					readOnly={true}
					setFieldValue={setValue}
				/>
			</div>
		</SubmitModal>
	);
};

export default SendDocument;
