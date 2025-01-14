import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import { uploadFile } from "../services/chatApi";
import { convertFileToBinary } from "../utils/binaryConversion"


const FileUploadModal = ({ userId }) => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const onSubmit = async (data) => {

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", data.file[0]);

            const file = data.file[0]

            console.log("Original File : ", file)

            const binFile = await convertFileToBinary(file)

            console.log("Binary File : ", binFile)

            toast.promise(
                uploadFile(userId, binFile),
                {
                    loading: 'Uploading...',
                    success: () => {
                        reset();
                        return 'File uploaded successfully!';
                    },
                    error: (err) => {
                        console.error("Error uploading file:", err);
                        return 'Failed to upload file.';
                    }
                }
            );
        } catch (err) {
            console.error("Error uploading file:", err);
            setError("Failed to upload file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <h3 className="text-lg font-bold pb-10">Upload File</h3>
                        <input
                            type="file"
                            {...register("file", { required: "File is required" })}
                            className="file-input file-input-ghost w-full max-w-xs"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn rounded btn-error">Close</label>
                            <button
                                type="submit"
                                className={`btn rounded bg-[#FFAD00] text-white hover:text-black hover:bg-[#FFAD00] ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner loading-md"></span> : "Upload"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};


FileUploadModal.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default FileUploadModal;
