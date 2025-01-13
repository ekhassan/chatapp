import { NavLink, Link } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import Popover from "./ui/Popover";

const Navbar = () => {

    const { session, signOut } = UserAuth()

    console.log(session)

    return (
        <header className="fixed w-full p-2 backdrop-blur-sm">
            <nav>
                <div className="flex items-center justify-between p-4">
                    <Link to='/' ><h3 className="text-xl  font-semibold">{import.meta.env.VITE_APP_NAME}</h3></Link>
                    <div className="flex items-center gap-5">
                        <NavLink
                            to="/messages"
                            className={({ isActive }) =>
                                isActive ? "text-white" : "text-gray-300"
                            }
                        >
                            Hello
                        </NavLink>

                        <div>
                            {
                                session?.user ?
                                    <Popover session={session} onClick={signOut} /> :
                                    <>
                                        <Link to="/login">Login</Link>
                                    </>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
