import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 transition-colors duration-300"
        >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
        </button>
    );
};

export default DarkMode;