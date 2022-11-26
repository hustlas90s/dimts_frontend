import { useState, useEffect, useCallback } from "react";
import { fieldRules } from "../../../components/authHelper";
import MyInputField from "../../../components/MyInputFieldFull";
import MyTextAreaField from "../../../components/MyTextArea";
import ImageUploader from "../../../components/ImageUploader";
import { useForm } from "react-hook-form";

const ProfileFormView = ({ userInfo }: any) => {
	const {
		handleSubmit,
		control,
		setValue,
		formState: { isSubmitted, submitCount },
	} = useForm<any>({
		defaultValues: {
			citizenID: "",
		},
	});

	const [imageName, setImageName] = useState<any>("");
	const [hasImageError, setHasImageErorr] = useState(false);

	const getImageBase64 = (file: any) => {
		var reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = function () {
			setValue("citizenID", reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	const onDropFrontId = useCallback(
		(files: any) => {
			setImageName(files[0].path);
			getImageBase64(files);
			setHasImageErorr(false);
		},
		[imageName, hasImageError]
	);

	const handleFrontFileRemove = () => {
		setImageName("");
		setHasImageErorr(true);
	};

	const onSubmitProfile = (formData: any) => {
		console.log(formData);
	};

	useEffect(() => {
		if (!imageName.length && submitCount > 0) {
			setHasImageErorr(true);
			console.log("Submit count: ", submitCount);
		}
	}, [isSubmitted]);

	return (
		<div className="w-[600px] grid grid-cols-2 gap-x-5 gap-y-8">
			<MyInputField
				control={control}
				fieldLabel="First Name"
				fieldType="text"
				fieldName="citizenFirstName"
				fieldRules={fieldRules.requiredStringRule}
				defaultValue={userInfo.first_name}
				setFieldValue={setValue}
			/>
			<MyInputField
				control={control}
				fieldLabel="Last Name"
				fieldType="text"
				fieldName="citizenLastName"
				fieldRules={fieldRules.requiredStringRule}
				defaultValue={userInfo.last_name}
				setFieldValue={setValue}
			/>
			<MyInputField
				control={control}
				fieldLabel="Email"
				fieldType="email"
				fieldName="citizenEmail"
				fieldRules={fieldRules.requiredUniqueEmailRule}
				defaultValue={userInfo.email}
				setFieldValue={setValue}
			/>
			<MyInputField
				control={control}
				fieldLabel="Mobile Number"
				fieldType="text"
				fieldName="citizenMobile"
				fieldRules={fieldRules.requiredMobileNumberRule}
				defaultValue={userInfo.contact_number}
				setFieldValue={setValue}
			/>
			<div className="col-span-2">
				<MyTextAreaField
					control={control}
					fieldLabel="Address"
					fieldName="citizenAddress"
					fieldRules={fieldRules.requiredRule}
					defaultValue={userInfo.address}
					setFieldValue={setValue}
				/>
			</div>
			<div className="cols-span-2 w-[600px]">
				<ImageUploader
					state={imageName}
					title="Valid ID"
					errorState={hasImageError}
					onDrop={onDropFrontId}
					onClickFileRemove={handleFrontFileRemove}
				/>
			</div>
			<div className="mt-5 w-full col-span-2 flex justify-between">
				<div></div>
				<button
					type="button"
					className="bg-purple-600 hover:bg-purple-500 w-48 focus:outline-none px-5 py-2 text-white font-medium tracking-wider rounded-lg text-sm"
					onClick={handleSubmit(onSubmitProfile)}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default ProfileFormView;
