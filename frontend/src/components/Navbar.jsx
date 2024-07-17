import React, { useState } from 'react';
import DarkMode from './DarkMode';
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a href="#" className="flex items-center py-4 px-2">
                            <span className="font-semibold text-lg">Your Logo</span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-1">
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">Home</a>
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">About</a>
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">Services</a>
                        <a href="#" className="py-4 px-2 hover:text-green-500 transition duration-300">Contact</a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <div className="px-2">
                            <DarkMode />
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
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isOpen ? "block" : "hidden"} px-2`}>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Home</a>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">About</a>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Services</a>
                <a href="#" className="block py-2 px-7 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;