import React from "react";

const Signup = () => {
    return (
        <div className="bg-gray-200 dark:bg-gray-800 min-h-screen flex flex-col justify-center">
            <div className="bg-white sm:mx-auto sm:max-w-md sm:w-full py-8 px-4 sm:px-10 sm:rounded-md shadow dark:bg-gray-800 border">
                <div className="mb-6 text-center">
                    <h1 className="font-bold text-3xl">Login</h1>
                </div>
                <div>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold">Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Email</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    placeholder="Enter your email"
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="text-sm hover:underline text-right hover:text-blue-600">
                            <a href="" className="font-semibold">Login here</a>
                        </div>
                        <div className="text-white font-bold">
                            <button className="mt-3 w-full p-2.5 rounded-md bg-blue-600 hover:bg-blue-800">
                                Signup
                            </button>
                        </div>
                    </form>
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
