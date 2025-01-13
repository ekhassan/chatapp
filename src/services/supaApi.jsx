import { supabase } from "./supabaseClient"

export const getChatHistory = async (user_id) => {
    
    const { data: chatHistory, error } = await supabase
        .from("chat_history")
        .select("*") 
        .eq("user_id", user_id) 
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching chat history:", error);
        return null;
    }

    return chatHistory;
};
