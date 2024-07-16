import React from 'react';
import DarkMode from './DarkMode';

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex space-x-7">
                        <div>
                            <a href="#" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-gray-500 dark:text-white text-lg">Your Logo</span>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <a href="#" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 transition duration-300">Home</a>
                            <a href="#" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 transition duration-300">About</a>
                            <a href="#" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 transition duration-300">Services</a>
                            <a href="#" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 transition duration-300">Contact</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <DarkMode />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;