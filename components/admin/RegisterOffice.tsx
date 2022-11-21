import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { registerFromAdmin } from "../../redux/authSlice";

interface RegisterOfficeParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
	selectOptions: any;
}

const RegisterOffice = ({
	isShow,
	onConfirm,
	onCancel,
	selectOptions,
}: RegisterOfficeParams) => {
	const { control, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		const data = {
			first_name: formData.officeFirstName,
			contact_number: formData.officeMobile,
			email: formData.officeEmail,
			username: formData.officeUsername,
			password: formData.officePassword,
			role: "office",
		};
		console.log("Office Account data:", data);
		onConfirm();
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Office Account"
			addText="Create new office account"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MyInputField
					control={control}
					fieldLabel="Province"
					fieldType="text"
					fieldName="officeProvince"
					fieldRules={fieldRules.requiredStringRule}
					defaultValue="Davao del Norte"
					readOnly={true}
					setFieldValue={setValue}
				/>
				<MySelectField
					myControl={control}
					myOptions={selectOptions}
					fieldName="officeFirstName"
					fieldLabel="City/Municipality"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
				/>
				<MyInputField
					control={control}
					fieldLabel="Mobile Number"
					fieldType="text"
					fieldName="officeMobile"
					fieldRules={fieldRules.requiredMobileNumberRule}
					defaultValue=""
					placeHolder="09123123123"
				/>
				<MyInputField
					control={control}
					fieldLabel="Email"
					fieldType="text"
					fieldName="officeEmail"
					fieldRules={fieldRules.requiredUniqueEmailRule}
					defaultValue=""
					placeHolder="dummy@gmail.com"
				/>
				<MyInputField
					control={control}
					fieldLabel="Username"
					fieldType="text"
					fieldName="officeUsername"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder="johndoe123"
				/>
				<MyInputField
					control={control}
					fieldLabel="Password"
					fieldType="password"
					fieldName="officePassword"
					fieldRules={fieldRules.requiredPasswordRule}
					defaultValue=""
					placeHolder="********"
				/>
			</div>
		</SubmitModal>
	);
};

export default RegisterOffice;
