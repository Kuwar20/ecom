import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

    const getButtonMessage = () => {
        if (isLoading) return "Loading...";
        if (!name) return "Register";
        if (!email) return "Email is required";
        if (!password) return "Password is required";
        if (passwordStrength.label === "Weak") return "Password is weak";
        return "Register";
    };
    const isButtonDisabled = () => {
        return (
            isLoading ||
            passwordStrength.label === "Weak" ||
            !name ||
            !email ||
            !password
        );
    };

    const handleSignup = async (userData) => {
        setIsLoading(true);
        console.log(name, email, password);
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log(data);
            if (data.message) {
                toast.success(data.message);
                console.log(data);
                setTimeout(() => {
                    navigate(data.role === "dealer" ? "/dealer" : data.role === "admin" ? "/admin" : "/user");
                }, 1000);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
            setEmail("");
            setPassword("");
            setName("");
        }
    };

    const handleTraditionalSignup = (e) => {
        e.preventDefault();
        handleSignup({ name, email, password });
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const userData = {
                googleToken: credentialResponse.credential,
                // You might want to add a flag to indicate this is a Google login
                isGoogleLogin: true
            };
            console.log(userData);
            console.log(credentialResponse);
            await handleSignup(userData);
        } catch (error) {
            console.error("Google login error:", error);
            toast.error("Google login failed");
        }
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <div className="bg-gray-200 dark:bg-gray-800 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="bg-white max-w-md w-full mx-auto py-8 px-4 sm:px-6 rounded-lg shadow-md dark:bg-gray-800 border">
                    <div className="mb-6 text-center">
                        <h1 className="font-bold text-3xl">Signup</h1>
                    </div>
                    <div>
                        <form className="space-y-4" onSubmit={handleTraditionalSignup}>
                            <div>
                                <label className="text-sm font-semibold">Name</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        disabled={isLoading}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            console.log(e.target.value);
                                        }}
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
                                            console.log(e.target.value);
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
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            console.log(e.target.value);
                                            setPasswordStrength(checkPasswordStrength(e.target.value));
                                        }}
                                        className="w-full border-2 p-2.5 rounded-md focus:border-blue-700 focus:outline-none dark:text-black"
                                    />
                                    {password && (
                                        <div
                                            className="absolute top-3 right-5 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <FaEye className="h-5 w-5" />
                                            ) : (
                                                <FaEyeSlash className="h-5 w-5" />
                                            )}
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
                                <Link to='/login' className="font-semibold">
                                    Already have Account? Login here
                                </Link>
                            </div>
                            <div className="text-white font-bold">
                                {/* 
                            // way 1 to disable button , but not recommended as it is not readable and manageable
                            <button
                                    disabled={isLoading || passwordStrength.label === "Weak" || !name || !email || !password}
                                    className={`
                                        ${isLoading || passwordStrength.label === "Weak" || !name || !email || !password
                                            ? "bg-gray-500"
                                            : "bg-green-500 hover:bg-green-700"
                                        }
                                        text-white w-full p-2 rounded-md transition-colors duration-200
                                    `}
                                >
                                    {isLoading
                                        ? "Loading..."
                                        : (passwordStrength.label === "Weak" && !isLoading)
                                            ? "Password too weak"
                                            : (!name && !isLoading)
                                                ? "Name is required"
                                                : (!email && !isLoading)
                                                    ? "Email is required"
                                                    : (!password && !isLoading)
                                                        ? "Password is required"
                                                        : "Signup"
                                    }
                                </button>
                                */}
                                <button
                                    type="submit"
                                    disabled={isButtonDisabled()}
                                    className={`
                                ${isButtonDisabled()
                                            ? "bg-gray-500"
                                            : "bg-green-600 hover:bg-green-700 cursor-pointer"
                                        }
                                    text-white font-semibold w-full p-2.5 rounded-md transition-colors duration-200
                                `}
                                >
                                    {getButtonMessage()}
                                </button>
                            </div>
                        </form>
                        <ToastContainer />
                        <div>
                            <div className="mt-3">
                                <h1 className="text-sm text-center">or continue with</h1>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={(error) => {
                                        console.error('Google login error:', error);
                                        toast.error('Google login failed');
                                    }}
                                    render={({ onClick }) => (
                                        <button onClick={onClick} className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100">
                                            <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
                                        </button>
                                    )}
                                />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Signup;
