import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="fixed w-full p-2 backdrop-blur-sm">
            <nav>
                <div className="flex items-center justify-between p-4">
                    <Link to='/' ><h3 className="text-xl  font-semibold">{import.meta.env.VITE_APP_NAME}</h3></Link>
                    <div>
                        <NavLink
                            to="/messages"
                            className={({ isActive }) =>
                                isActive ? "text-white" : "text-gray-300"
                            }
                        >
                            Hello
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
