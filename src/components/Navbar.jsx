import { NavLink, Link } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import Popover from "./ui/Popover";

const Navbar = () => {

    const { session, signOut } = UserAuth()


    return (
        <header className="fixed w-full p-2 backdrop-blur-sm z-10 bg-slate-100">
            <nav>
                <div className="flex items-center justify-between p-4">
                    <Link to='/' ><h3 className="text-base font-bold text-gray-900 ">{import.meta.env.VITE_APP_NAME}</h3></Link>
                    <div className="flex items-center gap-5">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-gray-900  font-semibold" : "text-gray-700"
                            }
                        >
                            Home
                        </NavLink>
                        <div>
                            {
                                session?.user ?
                                    <>
                                        <NavLink
                                            to="/chat"
                                            className={({ isActive }) =>
                                                isActive ? "text-gray-900 font-semibold pe-5" : "text-gray-700 pe-5"
                                            }
                                        >
                                            Chat
                                        </NavLink>
                                        <Popover session={session} onClick={signOut} />
                                    </>
                                    :
                                    <div className="flex items-center gap-4">
                                        <NavLink to="/login"
                                            className={({ isActive }) =>
                                                isActive ? "text-white font-semibold" : "text-gray-300"
                                            }
                                        >Login</NavLink>
                                        <NavLink to="/signup"
                                            className={({ isActive }) =>
                                                isActive ? "text-white font-semibold" : "text-gray-300"
                                            }
                                        >Sign Up</NavLink>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
