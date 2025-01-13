import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, SendHorizontal } from "lucide-react";

import { useQuery } from "@tanstack/react-query"

import ChatBubble from "../components/ui/ChatBubble";
import { UserAuth } from "../context/authContext";
import ChatHeader from "../components/ChatHeader";
// API's
import { sendMessage } from "../services/chatApi";
import { getChatHistory } from "../services/supaApi";
import toast from "react-hot-toast";



const ChatPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { session } = UserAuth();

    const { data: chatData, error: loadChatError, isLoading: loadChatLoading } = useQuery({
        queryKey: ['chats'],
        queryFn: () => getChatHistory(session?.user?.id),
        enabled: !!session?.user?.id
    })


    console.log(chatData)

    const [loading, setLoading] = useState(false);

    if (loadChatError) {
        toast.error("Somthing went wrong!")
    }


    const onSubmit = async ({ prompt }) => {
        if (!prompt.trim()) return;

        try {
            setLoading(true);
            const data = await sendMessage(session?.user?.id, prompt);

            console.log(data);
        } catch (err) {
            console.error("Error while sending message:", err?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="h-dvh max-h-dvh flex justify-center relative">
                <div className="w-full max-w-6xl rounded-2xl text-justify m-2">
                    <ChatHeader />
                    <div className="px-4 sm:px-10 pt-5 pb-32 overflow-auto h-[calc(100vh-200px)] sm:h-[calc(100vh-150px)]">
                        {loadChatLoading ?
                            <div className="flex items-center justify-center vh-100">
                                <span className="loading loading-spinner text-white loading-lg"></span>
                            </div> : chatData?.map((chat) => (
                                <ChatBubble key={chat.id} session={session} message={chat.prompt} response={chat.response} />
                            ))}
                    </div>
                </div>

                <div className="absolute bottom-6 w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4 flex items-center justify-center gap-4 px-5'>
                            <label className="input w-full md:w-1/2 input-bordered flex items-center gap-2 rounded-full">
                                <PlusCircle className='h-5 w-5 opacity-70' size={20} />
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Message"
                                    id="prompt"
                                    {...register('prompt', { required: 'Message is required' })}
                                    autoComplete='off'
                                    readOnly={loading}
                                />
                            </label>
                            <button
                                type='submit'
                                className={`btn btn-neutral btn-circle text-white hover:bg-white hover:text-black ${loading ? ' cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner text-white loading-md"></span> : <SendHorizontal className='h-5 w-5 opacity-70' />}

                            </button>
                        </div>
                        {errors.prompt && <span className="text-red-500">{errors.prompt.message}</span>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChatPage;