import { useState } from "react"
import { useForm } from "react-hook-form"
import { PlusCircle, SendHorizontal } from "lucide-react"
import ChatBubble from "../components/ui/ChatBubble";
import { UserAuth } from "../context/authContext";

const ChatPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { session } = UserAuth()



    return (
        <>
            <div className="h-dvh max-h-dvh flex justify-center relative ">

                <div className=" w-full max-w-6xl h-[35.5rem] mt-28 overflow-y-scroll px-10 pt-5 pb-32 rounded-2xl text-justify">
                    <ChatBubble session={session} />
                </div>

                <div className="absolute bottom-10 w-full">
                    <div className='mt-4 flex items-center justify-center gap-4 px-5'>
                        <label className="input w-full md:w-1/2 input-bordered flex items-center gap-2 rounded-full">
                            <PlusCircle className='h-5 w-5 opacity-70' size={20} />
                            <input type="email" className="grow" placeholder="Message"
                                id="email"
                                {...register('query', { required: 'Email is required' })}
                                autoComplete='off'
                            />
                        </label>
                        <button className="btn btn-neutral btn-circle text-white hover:bg-white hover:text-black">
                            <SendHorizontal className='h-5 w-5 opacity-70' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage