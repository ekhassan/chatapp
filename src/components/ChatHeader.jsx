import { UserAuth } from "../context/authContext"
import Popover from "./ui/Popover"

const ChatHeader = () => {

    const { session, signOut } = UserAuth()


    return (
        <>
            <div className="flex items-center justify-between rounded-t-2xl border-b border-b-gray-400 p-4">
                <div className="">
                    <h4 className="text-2xl">
                        {import.meta.env.VITE_APP_NAME}
                    </h4>
                </div>
                <div>
                    <Popover session={session} onClick={signOut} />
                </div>
            </div>
        </>
    )
}

export default ChatHeader