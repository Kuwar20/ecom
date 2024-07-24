import React, { useState } from 'react';
import DarkMode from './DarkMode';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a href="#" className="flex items-center py-4 px-2">
                            <span className="font-semibold text-lg"><Link to='/'>Ecom</Link></span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">Home</a>
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">About</a>
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">Services</a>
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">Contact</a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <div className="px-2 flex items-center">
                            <div className='px-2'>
                                <DarkMode />
                            </div>
                            <div className='px-2'>
                                <FaShoppingCart
                                    className="h-6 w-6 cursor-pointer"
                                    onClick={() => window.location.href = '/cart'}
                                />
                            </div>
                            <div className='px-2'>
                                <FaRegUserCircle
                                    className="h-8 w-6 cursor-pointer"
                                    onClick={() => window.location.href = '/login'}
                                />
                            </div>
                        </div>
                        <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen
                                ? <IoMdClose className="h-6 w-6" />
                                : <HiBars3BottomRight className="h-6 w-6" />
                            }
                        </button>
                    </div>
                    <div className="hidden md:flex items-center">
                        <DarkMode />
                        <div className="px-2">
                            <FaShoppingCart
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => window.location.href = '/cart'}
                            />
                        </div>
                        {email ? (
                            <div className="px-2 flex items-center">
                                <Link to='/profile' className="mr-2 font-semibold">{email}</Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="px-2">
                                <FaRegUserCircle
                                    className="h-8 w-6 cursor-pointer"
                                    onClick={() => window.location.href = '/login'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isOpen ? "block" : "hidden"} px-2`}>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Home</a>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">About</a>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Services</a>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Contact</a>
                {email ? (
                    <>
                        <Link
                            to='/profile'
                            className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {email}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block py-2 px-7 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Login</a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
