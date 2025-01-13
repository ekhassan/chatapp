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