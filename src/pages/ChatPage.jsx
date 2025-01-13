import { useState } from "react"
import { useForm } from "react-hook-form"
import { PlusCircle, SendHorizontal } from "lucide-react"
import ChatBubble from "../components/ui/ChatBubble";
import { UserAuth } from "../context/authContext";
import ChatHeader from "../components/ChatHeader";

const ChatPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { session } = UserAuth()



    return (
        <>
            <div className="h-dvh max-h-dvh flex justify-center relative">

                <div className="w-full max-w-7xl  rounded-2xl text-justify m-2">
                    <ChatHeader />
                    <div className="px-4 sm:px-10 pt-5 pb-32 overflow-auto h-[46rem] sm:h-full sm:max-h-[36rem] ">
                        <ChatBubble session={session} />
                    </div>
                </div>

                <div className="absolute bottom-6 w-full">
                    <form >
                        <div className='mt-4 flex items-center justify-center gap-4 px-5'>
                            <label className="input w-full md:w-1/2 input-bordered flex items-center gap-2 rounded-full">
                                <PlusCircle className='h-5 w-5 opacity-70' size={20} />
                                <input type="text" className="grow" placeholder="Message"
                                    id="email"
                                    {...register('query')}
                                    autoComplete='off'
                                />
                            </label>
                            <button type='submit' className="btn btn-neutral btn-circle text-white hover:bg-white hover:text-black">
                                <SendHorizontal className='h-5 w-5 opacity-70' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatPage