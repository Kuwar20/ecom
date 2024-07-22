import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Product from './pages/Product';
const Hero = lazy(() => import('./pages/Hero'));
const SignupForm = lazy(() => import('./forms/signup/Signup'));
const Login = lazy(() => import('./forms/login/Login'));

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-800 transition-colors duration-100 text-gray-900 dark:text-gray-100">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero/>} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<Product />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
