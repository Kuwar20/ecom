import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupForm from './forms/signup/Signup';

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-800 transition-colors duration-100 text-gray-900 dark:text-gray-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
