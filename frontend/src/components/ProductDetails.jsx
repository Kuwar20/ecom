import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { product } = location.state || {};

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className='min-h-screen p-8'>
            <h1 className='text-3xl font-bold mb-6'>{product.title}</h1>
            <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/2 mb-6 md:mb-0'>
                    <img src={product.image} alt={product.title} className='w-full h-auto object-contain' />
                </div>
                <div className='md:w-1/2 md:pl-8'>
                    <p className='text-xl font-semibold mb-4'>Price: ${product.price}</p>
                    <p className='mb-4'>{product.description}</p>
                    <p className='text-lg font-medium'>Category: {product.category}</p>
                    <p className='text-lg font-medium'>Count: {product.rating.count}</p>
                    <p className='text-lg font-medium'>Rating: {product.rating.rate}</p>
                    
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;