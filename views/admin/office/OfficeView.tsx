import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "../../../components/ImageUploader";

const OfficeView = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitted, submitCount },
  } = useForm<any>({
    defaultValues: {
      citizenIDName: "",
      citizenIDContent: "",
    },
  });
  const [imageName, setImageName] = useState<any>("");
  const [imageContent, setImageContent] = useState<any>("");
  const [hasImageError, setHasImageErorr] = useState(false);

  const getImageBase64 = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      setValue("citizenIDContent", reader.result);
      setImageContent(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const onDropFrontId = useCallback(
    (files: any) => {
      setImageName(files[0].path);
      setValue("citizenIDName", files[0].path);
      getImageBase64(files);
      setHasImageErorr(false);
    },
    [imageName, hasImageError]
  );

  const handleFrontFileRemove = () => {
    setImageName("");
    setImageContent("");
    setHasImageErorr(true);
  };

  return (
    <div className="flex flex-col items-center gap-y-20">
      <div className="h-auto w-[80%] pl-1 pr-5 py-5 bg-white rounded-lg shadow border-b border-gray-200">
        <div className="flex flex-row justify-end gap-x-3">
          <button className="w-28 h-12 border bg-purple-600 text-white text-lg font-bold rounded-lg tracking-widest">
            Upload
          </button>
          <button className="w-28 h-12 border border-purple-600 text-purple-600 text-lg font-bold rounded-lg tracking-widest">
            FillUp
          </button>
        </div>
        <div className="w-full flex flex-row justify-center px-5 py-14">
          <ImageUploader
            state={imageName}
            title="Select File to Upload"
            errorState={hasImageError}
            onDrop={onDropFrontId}
            onClickFileRemove={handleFrontFileRemove}
          />
        </div>
        <div className="flex flex-row justify-end gap-x-3">
          <button className="w-28 h-12 border bg-purple-600 text-white text-lg font-bold rounded-lg">
            Submit
          </button>
        </div>
      </div>
      <div className="h-auto w-[80%] pl-1 pr-5 py-5 bg-white rounded-lg shadow border-b border-gray-200">
        <h4 className="text-3xl font-bold pl-5">Acknowledged Documents</h4>
        <div className="w-full border-b border-gray-300 my-5 ml-2"></div>
        <div className="p-4 ml-4">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Barcode No.
                </th>
                <th scope="col" className="px-6 py-4">
                  Case No.
                </th>
                <th scope="col" className="px-6 py-4">
                  Date Submitted
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white hover:bg-gray-50 cursor-pointer">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap"
                >
                  123
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap"
                >
                  123
                </td>
                <td className="px-6 py-4">10/21/2015</td>
                <td className="px-6 py-4">Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OfficeView;
