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

export const uploadFile = async (user_id, data) => {
    try {
        const response = await axios.post(import.meta.env.VITE_UPLOAD_API, {
            user_id,
            data0:data,
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}