import { Controller } from "react-hook-form";

interface MySelectFieldProps {
	myControl: any;
	myOptions: any;
	fieldName: string;
	fieldLabel: string;
	fieldRules: any;
	defaultValue?: string;
}

const MySelectField = ({
	myControl,
	myOptions,
	fieldName,
	fieldLabel,
	fieldRules,
	defaultValue,
}: MySelectFieldProps) => {
	return (
		<Controller
			control={myControl}
			name={fieldName}
			rules={fieldRules}
			defaultValue={defaultValue ?? ""}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<div className="flex flex-col gap-y-1">
					<label className="text-sm font-semibold tracking-wider">
						{fieldLabel}
					</label>
					<select
						id={fieldName}
						className="w-full bg-gray-100 px-3 py-1 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg appearance-none"
						onChange={onChange}
						defaultValue=""
					>
						<option
							disabled
							value=""
						></option>
						{myOptions.map((option: any) => {
							return <option value={option.value}>{option.label}</option>;
						})}
					</select>
					{error && (
						<p className="text-xs text-rose-500">
							{error.type !== "validate"
								? error.message
								: "Email already used in another account"}
						</p>
					)}
				</div>
			)}
		/>
	);
};

export default MySelectField;
