import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const { product } = useLocation().state || {};

    if (!product) return <div className="text-center mt-8">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">{product.title}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
                </div>
                <div className="md:w-2/3">
                    <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
                    <p className="mb-4">{product.description}</p>
                    <p className="mb-2"><span className="font-medium">Category:</span> {product.category}</p>
                    <p className="mb-2"><span className="font-medium">In Stock:</span> {product.rating.count}</p>
                    <div className="flex items-center">
                        <span className="font-medium mr-2">Rating:</span>
                        <span className="text-yellow-500">{'★'.repeat(Math.round(product.rating.rate))}</span>
                        <span className="text-gray-400">{'★'.repeat(5 - Math.round(product.rating.rate))}</span>
                        <span className="ml-2">({product.rating.rate})</span>
                    </div>
                    <button className='bg-slate-400 mt-4 p-3 rounded-md hover:bg-green-600 text-white'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;