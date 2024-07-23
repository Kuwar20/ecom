import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';

const Product = () => {

    const dispatch = useDispatch();
    const { items, isLoading, error, lastFetched } = useSelector((state) => state.products);

    useEffect(() => {
        const shouldFetch = !lastFetched || Date.now() - lastFetched > 5 * 60 * 1000; // 5 minutes
        if (shouldFetch) {
            dispatch(fetchProducts());
        }
    }, [dispatch, lastFetched]);


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='min-h-screen'>
            <h1 className='bg-white text-center text-2xl font-bold mb-4 p-4 dark:text-black dark:bg-white'>Product Details</h1>
            <div className='m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {items.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} state={{ product }} className='block'>
                        <div className='bg-white shadow-md rounded-lg p-6 w-full h-[380px] flex flex-col hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer dark:text-black'>
                            <div className='relative overflow-hidden rounded-lg h-[250px]'>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className='w-full h-full object-contain'
                                />
                                <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
                            </div>
                            <div className='flex flex-col items-start mt-4'>
                                <h2 className='text-sm font-semibold mb-2 line-clamp-2'>{product.title}</h2>
                                <p className='text-sm font-medium text-gray-700 mt-1'>Price: ${product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Product;