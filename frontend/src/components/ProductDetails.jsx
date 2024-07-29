// src/components/ProductDetail.js
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const { product } = useLocation().state || {};

    const dispatch = useDispatch();

    if (!product) return <div className="text-center mt-8">Product not found</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 p-6">
                            <div className="relative group dark:opacity-50">
                                <img src={product.image} alt={product.title} className="w-full h-96 object-contain" />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        <div className="md:w-1/3 p-6 text-justify">
                            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                            <p className="text-2xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</p>
                            <p className="text-gray-600 mb-6 dark:text-white">{product.description}</p>
                            <div className="mb-4">
                                <span className="font-medium text-gray-700 dark:text-white">Category:</span>
                                <span className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">{product.category}</span>
                            </div>
                            <div className="mb-4">
                                <span className="font-medium text-gray-700 dark:text-white">Availability:</span>
                                <span className={`ml-2 px-3 py-1 rounded-full text-sm ${product.rating.count > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {product.rating.count > 0 ? `In Stock (${product.rating.count})` : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="flex items-center mb-6">
                                <span className="font-medium text-gray-700 dark:text-white mr-2">Rating:</span>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} className={`w-5 h-5 ${index < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-gray-600">({product.rating.rate})</span>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="w-1/3 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ProductDetail;
