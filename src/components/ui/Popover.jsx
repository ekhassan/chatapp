import { useState } from 'react';
import PropTypes from "prop-types"

const Popover = ({ session, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const avatarContent = session ? session?.user?.email.charAt(0).toUpperCase() : '?';

    return (
        <div className="relative inline-block text-left">
            {session?.user?.avatarUrl ? (
                <img
                    id="avatarButton"
                    onClick={toggleDropdown}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={session?.user?.avatarUrl}
                    alt="User dropdown"
                />
            ) : (
                <div
                    id="avatarButton"
                    onClick={toggleDropdown}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-black font-bold cursor-pointer"
                >
                    {avatarContent} {/* Display first character of email */}
                </div>
            )}

            {isOpen && (
                <div id="userDropdown" className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-[#1C1E1F] dark:divide-gray-600">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{session?.user?.name}</div>
                        <div className="font-medium truncate">{session?.user?.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <button onClick={onClick} className="block w-full rounded-b-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                    </div>
                </div>
            )}
        </div>
    );
}

Popover.propTypes = {
    session: PropTypes.shape({
        user: PropTypes.shape({
            avatarUrl: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Popover;
