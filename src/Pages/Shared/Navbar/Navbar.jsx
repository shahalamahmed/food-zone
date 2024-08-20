import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const isActive = (path) => location.pathname === path ? 'text-blue-500' : 'text-white';

    const navOptions = (
        <>
            <li><Link className={isActive("/")} to="/">Home</Link></li>
            <li><Link className={isActive("/about")} to="/about">About</Link></li>
            <li><Link className={isActive("/blogs")} to="/blogs">Blogs</Link></li>
            {user ? (
                <>
                    <li>
                        <button onClick={handleLogOut} className="text-blue-400 hover:text-blue-600">
                            LogOut
                        </button>
                    </li>
                </>
            ) : (
                <li><Link className={isActive("/login")} to="/login">Login</Link></li>
            )}
        </>
    );

    return (
        <nav className="navbar bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4 py-2">
                <div className="navbar-start flex items-center">
                    <button className="lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link to="/" className="text-2xl font-bold">Bistro Boss</Link>
                </div>
                <div className="navbar-center hidden lg:flex space-x-4">
                    <ul className="flex space-x-4">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end hidden lg:flex items-center space-x-4">
                    {user && (
                        <div className="relative">
                            <button className="flex items-center text-gray-300 hover:text-gray-400">
                                <span className="mr-2">{user.displayName}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <ul className="py-1">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut} className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    <Link to="/getstarted">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
            <div className="navbar-menu lg:hidden">
                <ul className="menu menu-compact mt-2 p-2 shadow bg-gray-800 rounded-box w-full">
                    {navOptions}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
