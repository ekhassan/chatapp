
import { ArrowUpRight } from "lucide-react"

import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <>
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background: radial-gradient(125% 125% at 50% 10%, #1c1e1f 40%, #63e 100%);]"></div>
                <div className='flex items-center justify-center h-screen'>
                    <div className='text-center px-3'>
                        <h1 className='text-6xl font-bold text-white'>
                            Unlock mysteries
                        </h1>
                        <h1 className='text-6xl font-bold text-white'>
                            wherever you are
                        </h1>

                        <h5 className='text-wrap py-6 text-white font-medium'>
                            {import.meta.env.VITE_APP_NAME} is an extensible, self-hosted AI interface that adapts to prompt to generate image.
                        </h5>
                        <div>
                            <Link to={'/chat'} className="btn rounded-full btn-wide glass text-white hover:text-black hover:bg-white">Get Started <ArrowUpRight size={16} /></Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomePage