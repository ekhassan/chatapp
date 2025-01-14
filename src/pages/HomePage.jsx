
import { MessageSquare } from "lucide-react"

import { Link } from "react-router-dom"

import BramHead from "../assets/images/Bram_Biomechanic_head.png"

const HomePage = () => {
    return (
        <>
            <div className="px-5 md:px-20">
                <div className='flex items-center justify-between h-screen flex-wrap'>
                    <div className='px-3 order-2 md:order-1'>
                        <h1 className='text-5xl font-bold text-white'>
                            Welkom bij Sales Vol Energie
                        </h1>
                        <h5 className='text-wrap py-6 text-white font-medium'>
                            This is the home of Bram&apos;s Sales Coaching Ai Twin
                        </h5>
                        <div>
                            <Link to={'/chat'} className="btn rounded bg-[#FFAD00] btn-wide text-white hover:text-black hover:bg-white"><MessageSquare /> Probeer het uit</Link>
                        </div>
                    </div>
                    <div className="w-96  order-1 md:order-2 mt-20 md:mt-0 ">
                        <img src={BramHead} alt="" className="w-full h-full rounded-md" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage