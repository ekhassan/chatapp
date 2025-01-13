import { BotMessageSquare } from "lucide-react";


const ChatBubble = ({ session, message, response }) => {

    const avatarContent = session ? session?.user?.email.charAt(0).toUpperCase() : '?';

    return (
        <>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        {session?.user?.avatarUrl ? (
                            <img
                                id="avatarButton"
                                className="w-10 h-10 rounded-full "
                                src={session?.user?.avatarUrl}
                                alt="User"
                            />
                        ) : (
                            <div
                                id="avatarButton"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black font-bold"
                            >
                                {avatarContent}
                            </div>
                        )}
                    </div>
                </div>
                <div className="chat-bubble">{message}</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">

                        <div
                            id="avatarButton"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black font-bold"
                        >
                            <BotMessageSquare />
                        </div>
                    </div>
                </div>
                <div className="chat-bubble bg-[#5f5f5f] text-gray-100">{response}</div>
            </div>
        </>
    )
}

export default ChatBubble