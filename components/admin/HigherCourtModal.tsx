import SubmitModal from "../SubmitModal";
import MyInputField from "../MyInputField";
import MySelectField from "../MySelectField";
import { useForm } from "react-hook-form";
import { fieldRules } from "../authHelper";
import { useAppDispatch } from "../../redux/hooks";
import { updateDocket } from "../../redux/dataSlice";
import MyTextAreaField from "../MyTextArea";

interface HigherCourtModalParams {
	isShow: boolean;
	onConfirm(): void;
	onCancel(): void;
}

const HigherCourtModal = ({
	isShow,
	onConfirm,
	onCancel,
}: HigherCourtModalParams) => {
	const dispatch = useAppDispatch();

	const onSubmit = () => {
		const courtHearingData = JSON.parse(localStorage.courtHearingData);
		const courtHearingId = JSON.parse(localStorage.courtHearingId);
		dispatch(
			updateDocket({ formData: courtHearingData, docket_id: courtHearingId })
		).then(() => {
			onConfirm();
		});
	};

	return (
		<SubmitModal
			isShow={isShow}
			addTitle="Docket Case"
			addText="Proceed to higher court"
			onConfirm={onSubmit}
			onCancel={onCancel}
		>
			<h4 className="w-96 font-mont text-gray-700 font-medium tracking-wide">
				Clicking submit will proceed this case to higher court, do you want to
				continue?
			</h4>
		</SubmitModal>
	);
};

export default HigherCourtModal;
