// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Product = () => {
//     const [productData, setProductData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch('https://fakestoreapi.com/products/1')
//             .then(res => res.json())
//             .then(json => {
//                 console.log(json);
//                 setProductData(json);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.log(err);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (!productData) return <div>Error loading product data</div>;

//     return (
//         <div className='bg-white min-h-screen mx-6'>
//             <h1 className='text-2xl font-bold mb-4'>Product Details</h1>
//             <div className='grid grid-cols-4 gap-4'>
//                 <Link to={`/product/${productData.id}`}>
//                     <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xs hover:shadow-lg transition-transform transform hover:scale-105'>
//                         <div key={productData.id}>
//                             <div className='relative overflow-hidden rounded-lg'>
//                                 <img
//                                     src={productData.image}
//                                     alt={productData.title}
//                                     className='w-full h-auto object-cover'
//                                 />
//                                 <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
//                             </div>
//                             <div className='flex flex-col items-start mt-4'>
//                                 <h2 className='text-sm font-semibold mb-2'>{productData.title}</h2>
//                                 <p className='text-sm font-medium text-gray-700 mb-4'>Price: ${productData.price}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//                 <Link to={`/product/${productData.id}`}>
//                     <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xs hover:shadow-lg transition-transform transform hover:scale-105'>
//                         <div key={productData.id}>
//                             <div className='relative overflow-hidden rounded-lg'>
//                                 <img
//                                     src={productData.image}
//                                     alt={productData.title}
//                                     className='w-full h-auto object-cover'
//                                 />
//                                 <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
//                             </div>
//                             <div className='flex flex-col items-start mt-4'>
//                                 <h2 className='text-sm font-semibold mb-2'>{productData.title}</h2>
//                                 <p className='text-sm font-medium text-gray-700 mb-4'>Price: ${productData.price}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//                 <Link to={`/product/${productData.id}`}>
//                     <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xs hover:shadow-lg transition-transform transform hover:scale-105'>
//                         <div key={productData.id}>
//                             <div className='relative overflow-hidden rounded-lg'>
//                                 <img
//                                     src={productData.image}
//                                     alt={productData.title}
//                                     className='w-full h-auto object-cover'
//                                 />
//                                 <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
//                             </div>
//                             <div className='flex flex-col items-start mt-4'>
//                                 <h2 className='text-sm font-semibold mb-2'>{productData.title}</h2>
//                                 <p className='text-sm font-medium text-gray-700 mb-4'>Price: ${productData.price}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//                 <Link to={`/product/${productData.id}`}>
//                     <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xs hover:shadow-lg transition-transform transform hover:scale-105'>
//                         <div key={productData.id}>
//                             <div className='relative overflow-hidden rounded-lg'>
//                                 <img
//                                     src={productData.image}
//                                     alt={productData.title}
//                                     className='w-full h-auto object-cover'
//                                 />
//                                 <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
//                             </div>
//                             <div className='flex flex-col items-start mt-4'>
//                                 <h2 className='text-sm font-semibold mb-2'>{productData.title}</h2>
//                                 <p className='text-sm font-medium text-gray-700 mb-4'>Price: ${productData.price}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//                 <Link to={`/product/${productData.id}`}>
//                     <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xs hover:shadow-lg transition-transform transform hover:scale-105'>
//                         <div key={productData.id}>
//                             <div className='relative overflow-hidden rounded-lg'>
//                                 <img
//                                     src={productData.image}
//                                     alt={productData.title}
//                                     className='w-full h-auto object-cover'
//                                 />
//                                 <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
//                             </div>
//                             <div className='flex flex-col items-start mt-4'>
//                                 <h2 className='text-sm font-semibold mb-2'>{productData.title}</h2>
//                                 <p className='text-sm font-medium text-gray-700 mb-4'>Price: ${productData.price}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Product;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/1')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProductData(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!productData) return <div>Error loading product data</div>;

    return (
        <div className='bg-slate-100 min-h-screen mx-6'>
            <h1 className='bg-white text-2xl font-bold mb-4 p-4 rounded-lg'>Product Details</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {[...Array(5)].map((_, index) => (
                    <Link key={index} to={`/product/${productData.id}`} className='block'>
                        <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xs hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer'>
                            <div className='relative overflow-hidden rounded-lg'>
                                <img
                                    src={productData.image}
                                    alt={productData.title}
                                    className='w-full h-1/3 object-cover'
                                />
                                <div className='absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300'></div>
                            </div>
                            <div className='flex flex-col items-start mt-4'>
                                <h2 className='text-sm font-semibold mb-2'>{productData.title}</h2>
                                <p className='text-sm font-medium text-gray-700 mb-4'>Price: ${productData.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Product;
