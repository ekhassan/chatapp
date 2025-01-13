import { Link } from "react-router-dom"
import { getYear } from "../utils/dates"

const Footer = () => {
    return (
        <>
            <footer className="px-5 py-5 border-t-2 border-gray-400" >
                <div className="flex flex-wrap items-center justify-between">
                    <Link to={`mailto:${import.meta.env.VITE_SUPPORT_MAIL}`} className="text-sm font-semibold text-gray-300">{import.meta.env.VITE_SUPPORT_MAIL}</Link>
                    <div>
                        <div>
                            <p className="font-semibold text-sm">
                                Copyright © {getYear()} {import.meta.env.VITE_APP_NAME}
                            </p>
                        </div>
                        <div className="py-1">
                            links
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer