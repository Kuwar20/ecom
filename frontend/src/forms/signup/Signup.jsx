import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignupForm = async (e) => {
        setLoading(true);
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
            setLoading(false);
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
                                    onChange={(e) => { setPassword(e.target.value); console.log(e.target.value) }}
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none dark:text-black"
                                />
                                {password && (
                                    <div
                                        className="absolute top-3 right-5 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye className='h-5 w-5' /> : <FaEyeSlash className='h-5 w-5' />}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-sm hover:underline text-right hover:text-blue-600">
                            <a href="" className="font-semibold">Login here</a>
                        </div>
                        <div className="text-white font-bold">
                            <button
                                disabled={loading}
                                className="mt-3 w-full p-2.5 rounded-md bg-blue-600 hover:bg-blue-800">
                                {loading ? "Loading..." : "Signup"}
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
