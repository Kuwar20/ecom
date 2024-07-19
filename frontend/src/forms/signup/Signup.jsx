import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        strength: 0,
        label: "",
    });
    const navigate = useNavigate();

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 5) strength += 2;
        if (password.length > 8) strength += 1;
        if (password.match(/[a-z]+/)) strength += 1;
        if (password.match(/[A-Z]+/)) strength += 1;
        if (password.match(/[0-9]+/)) strength += 1;
        if (password.match(/[$@#&!]+/)) strength += 1;

        let strengthLabel = "Weak";
        if (strength > 3) strengthLabel = "Moderate";
        if (strength > 5) strengthLabel = "Strong";

        return { strength, label: strengthLabel };
    };

    const handleSignupForm = async (e) => {
        setIsLoading(true);
        e.preventDefault()
        console.log(name, email, password)
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            console.log(data);
            if (data.message) {
                // Redirect based on role
                if (data.role === 'dealer') {
                    toast.success(data.message);
                    setTimeout(() => {
                        navigate('/dealer');
                    }, 1000);
                } else if (data.role === 'admin') {
                    toast.success(data.message);
                    setTimeout(() => {
                        navigate('/admin');
                    }, 1000);
                } else {
                    toast.success(data.message);
                    setTimeout(() => {
                        navigate('/user');
                    }, 1000);
                }
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
            setEmail("");
            setPassword("");
            setName("");
        }
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-800 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white max-w-md w-full mx-auto py-8 px-4 sm:px-6 rounded-lg shadow-md dark:bg-gray-800 border">
                <div className="mb-6 text-center">
                    <h1 className="font-bold text-3xl">Signup</h1>
                </div>
                <div>
                    <form className="space-y-4" onSubmit={handleSignupForm}>
                        <div>
                            <label className="text-sm font-semibold">Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    disabled={isLoading}
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); console.log(e.target.value) }}
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none dark:text-black"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        console.log(e.target.value)
                                    }}
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your email"
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none dark:text-black"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    disabled={isLoading}
                                    onChange={(e) => { setPassword(e.target.value); console.log(e.target.value); setPasswordStrength(checkPasswordStrength(e.target.value)) }}
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none dark:text-black"
                                />
                                {password && (
                                    <div
                                        className="absolute top-3 right-5 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye className='h-5 w-5' /> : <FaEyeSlash className='h-5 w-5' />}
                                    </div>
                                )}
                                {password && (
                                    <div className="mt-1.5 p-0.5">
                                        <div className="w-1/2 bg-gray-200 rounded-full h-1">
                                            <div
                                                className={`h-1 rounded-full ${passwordStrength.label === "Weak"
                                                    ? "bg-red-500"
                                                    : passwordStrength.label === "Moderate"
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                    }`}
                                                style={{
                                                    width: `${(passwordStrength.strength / 7) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="w-1/2 flex justify-between mt-1">
                                            <span className="text-xs text-gray-500">Weak</span>
                                            <span className="text-xs text-gray-500">Strong</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-sm hover:underline text-right hover:text-blue-600">
                            <a href="" className="font-semibold">Login here</a>
                        </div>
                        <div className="text-white font-bold">
                            <button
                                disabled={isLoading || passwordStrength.label === "Weak"}
                                className={`
                                    ${isLoading || passwordStrength.label === "Weak"
                                        ? "bg-gray-300"
                                        : "bg-green-500 hover:bg-green-700"
                                    }
                                    text-white w-full p-2 rounded-md transition-colors duration-200
                                `}
                            >
                                {isLoading
                                    ? "Loading..."
                                    : passwordStrength.label === "Weak"
                                        ? "Password too weak"
                                        : "Signup"}
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                    <div>
                        <div className="mt-3">
                            <h1 className="text-sm text-center">or continue with</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <a
                                href="#"
                                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                            >
                                <img
                                    className="h-5 w-5"
                                    src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                    alt="Facebook"
                                />
                            </a>
                            <a
                                href="#"
                                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                            >
                                <img
                                    className="h-6 w-6"
                                    src="https://www.svgrepo.com/show/506498/google.svg"
                                    alt="Google"
                                />
                            </a>
                            <a
                                href="#"
                                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                            >
                                <img
                                    className="h-5 w-5"
                                    src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                    alt="Twitter"
                                />
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;
