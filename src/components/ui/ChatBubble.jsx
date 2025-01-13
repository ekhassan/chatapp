

const ChatBubble = ({ session, msg }) => {

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
                <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
            </div>
        </>
    )
}

export default ChatBubble