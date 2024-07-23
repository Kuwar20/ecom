import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';

const Layout = lazy(() => import('./layout/Layout'));
const Cart = lazy(() => import('./components/Cart'));
const Product = lazy(() => import('./pages/Product'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const SignupForm = lazy(() => import('./forms/signup/Signup'));
const LoginForm = lazy(() => import('./forms/login/Login'));

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-800 transition-colors duration-100 text-gray-900 dark:text-gray-100">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
