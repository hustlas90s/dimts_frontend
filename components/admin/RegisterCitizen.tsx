import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { registerFromAdmin } from "../../redux/authSlice";

interface RegisterCitizenParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
}

const RegisterCitizen = ({
	isShow,
	onConfirm,
	onCancel,
}: RegisterCitizenParams) => {
	const { control, handleSubmit } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = (formData: any) => {
		const data = {
			first_name: formData.citizenFirstName,
			last_name: formData.citizenLastName,
			contact_number: formData.citizenMobile,
			email: formData.citizenEmail,
			username: formData.citizenUsername,
			password: formData.citizenPassword,
			role: "citizen",
		};
		dispatch(registerFromAdmin(data)).then(() => onConfirm());
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="citizen Account"
			addText="Create new citizen account"
			onConfirm={handleSubmit(onSubmit)}
			onCancel={onCancel}
		>
			<div className="grid grid-cols-2 gap-y-8 gap-x-5">
				<MyInputField
					control={control}
					fieldLabel="First Name"
					fieldType="text"
					fieldName="citizenFirstName"
					fieldRules={fieldRules.requiredStringRule}
					defaultValue=""
					placeHolder="John"
				/>
				<MyInputField
					control={control}
					fieldLabel="Last Name"
					fieldType="text"
					fieldName="citizenLastName"
					fieldRules={fieldRules.requiredStringRule}
					defaultValue=""
					placeHolder="Doe"
				/>
				<MyInputField
					control={control}
					fieldLabel="Mobile Number"
					fieldType="text"
					fieldName="citizenMobile"
					fieldRules={fieldRules.requiredMobileNumberRule}
					defaultValue=""
					placeHolder="09123123123"
				/>
				<MyInputField
					control={control}
					fieldLabel="Email"
					fieldType="text"
					fieldName="citizenEmail"
					fieldRules={fieldRules.requiredUniqueEmailRule}
					defaultValue=""
					placeHolder="dummy@gmail.com"
				/>
				<MyInputField
					control={control}
					fieldLabel="Username"
					fieldType="text"
					fieldName="citizenUsername"
					fieldRules={fieldRules.requiredRule}
					defaultValue=""
					placeHolder="johndoe123"
				/>
				<MyInputField
					control={control}
					fieldLabel="Password"
					fieldType="password"
					fieldName="citizenPassword"
					fieldRules={fieldRules.requiredPasswordRule}
					defaultValue=""
					placeHolder="********"
				/>
			</div>
		</SubmitModal>
	);
};

export default RegisterCitizen;
