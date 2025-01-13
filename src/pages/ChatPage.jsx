import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Paperclip, SendHorizontal } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChatBubble from "../components/ui/ChatBubble";
import { UserAuth } from "../context/authContext";
import ChatHeader from "../components/ChatHeader";
// API's
import { sendMessage } from "../services/chatApi";
import { getChatHistory } from "../services/supaApi";
import toast from "react-hot-toast";
import FileUploadModal from "../components/FileUploadModel";

const ChatPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const { session } = UserAuth();
    const queryClient = useQueryClient();
    const chatContainerRef = useRef(null);

    const { data: chatData, error: loadChatError, isLoading: loadChatLoading } = useQuery({
        queryKey: ['chats'],
        queryFn: () => getChatHistory(session?.user?.id),
        enabled: !!session?.user?.id
    });

    const [loading, setLoading] = useState(false);
    const [pollingInterval, setPollingInterval] = useState(null);

    if (loadChatError) {
        toast.error("Something went wrong!");
    }


    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatData]);

    const onSubmit = async ({ prompt }) => {
        if (!prompt.trim()) return;

        const userMessage = {
            id: Date.now(),
            prompt,
            response: null
        };
        queryClient.setQueryData(['chats'], (oldData) => [...oldData, userMessage]);

        try {
            setLoading(true);
            await sendMessage(session?.user?.id, prompt);
            startPolling(userMessage);
        } catch (err) {
            console.error("Error while sending message:", err?.message);
            toast.error("Failed to send message.");
        } finally {
            setLoading(false);
            reset();
        }
    };

    const FileSubmit = async () => {

    }

    const startPolling = (userMessage) => {
        if (pollingInterval) clearInterval(pollingInterval);
        const intervalId = setInterval(async () => {
            try {
                const updatedChatData = await getChatHistory(session?.user?.id);
                const updatedMessage = updatedChatData.find(chat => chat.prompt === userMessage.prompt);
                if (updatedMessage && updatedMessage.response) {
                    queryClient.setQueryData(['chats'], (oldData) =>
                        oldData.map(chat =>
                            chat.prompt === userMessage.prompt ? { ...chat, response: updatedMessage.response } : chat
                        )
                    );
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error("Error fetching chat history:", error);
                clearInterval(intervalId);
            }
        }, 2000);

        setPollingInterval(intervalId);
    };

    return (
        <>
            <div className="h-dvh max-h-dvh flex justify-center relative">
                <div className="w-full max-w-6xl rounded-2xl text-justify m-2">
                    <ChatHeader />
                    <div
                        ref={chatContainerRef} // Attach ref to the chat container
                        className="px-4 sm:px-10 pt-5 pb-32 overflow-auto h-[calc(100vh-200px)] sm:h-[calc(100vh-150px)]"
                    >
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

                                <label htmlFor="my_modal_6"> <Paperclip className='h-5 w-5 opacity-70' size={20} /></label>
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
                    </form>
                    <FileUploadModal userId={session.user.id} />
                </div >
            </div >
        </>
    );
};

export default ChatPage;
