import { Controller } from 'react-hook-form'

interface MyInputFieldProps {
    control: any;
    fieldLabel: string; 
    fieldType: string; 
    fieldName: string;
    fieldRules: any;
    defaultValue?: string; 
    placeHolder?: string;
}

const MyInputField = ({ control, fieldLabel, fieldType, fieldName, fieldRules, defaultValue, placeHolder }: MyInputFieldProps) => {
    return (
        <Controller 
            control={ control }
            name={ fieldName }
            rules={ fieldRules }
            defaultValue={ defaultValue ?? "" }
            render={({
                field: { onChange },
                fieldState: { error }
            }) => (
                <div className="flex flex-col gap-y-1">
                    <label className="font-semibold text-sm">{ fieldLabel }</label>
                    <input 
                        type={ fieldType }
                        id={ fieldName }
                        className="bg-gray-100 px-3 py-1 w-72 focus:outline-none border border-gray-200 focus:border-purple-400 rounded-lg" 
                        placeholder={ placeHolder }
                        onChange={ onChange }
                        defaultValue={ defaultValue ?? "" }
                    />
                    { error && <p className="text-xs text-rose-500">{ error.type !== 'validate' ? error.message : 'Email already used in another account' }</p> }
                </div>
            )}
        />
    )
}

export default MyInputField