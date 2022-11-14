import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";

interface RegisterStaffParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
}

const RegisterStaff = ({
	isShow,
	onConfirm,
	onCancel,
}: RegisterStaffParams) => {
	const { control, handleSubmit } = useForm();

	const onSubmit = (formData: any) => {
		onConfirm();
		console.log("Staff account data: ", formData);
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Staff Account"
			addText="Create new staff account"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MyInputField
					control={control}
					fieldLabel="First Name"
					fieldType="text"
					fieldName="staffFirstName"
					fieldRules={fieldRules.requiredStringRule}
					defaultValue=""
					placeHolder="John"
				/>
				<MyInputField
					control={control}
					fieldLabel="Last Name"
					fieldType="text"
					fieldName="staffLastName"
					fieldRules={fieldRules.requiredStringRule}
					defaultValue=""
					placeHolder="Doe"
				/>
				<MyInputField
					control={control}
					fieldLabel="Email"
					fieldType="text"
					fieldName="staffEmail"
					fieldRules={fieldRules.requiredUniqueEmailRule}
					defaultValue=""
					placeHolder="dummy@gmail.com"
				/>
				<MyInputField
					control={control}
					fieldLabel="Mobile Number"
					fieldType="text"
					fieldName="staffMobile"
					fieldRules={fieldRules.requiredMobileNumberRule}
					defaultValue=""
					placeHolder="09123123123"
				/>
				<MyInputField
					control={control}
					fieldLabel="Username"
					fieldType="text"
					fieldName="staffUsername"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder="johndoe123"
				/>
				<MyInputField
					control={control}
					fieldLabel="Password"
					fieldType="password"
					fieldName="staffPassword"
					fieldRules={fieldRules.requiredPasswordRule}
					defaultValue=""
					placeHolder="********"
				/>
			</div>
		</SubmitModal>
	);
};

export default RegisterStaff;
