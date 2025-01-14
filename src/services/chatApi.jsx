import axios from "axios"

export const sendMessage = async (user_id, prompt) => {
    try {
        const response = await axios.post(import.meta.env.VITE_MESSAGE_API, {
            user_id,
            prompt
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const uploadFile = async (user_id, binFile) => {

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('data0', binFile);

    console.log(binFile);

    try {
        const response = await axios.post(import.meta.env.VITE_UPLOAD_API, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}