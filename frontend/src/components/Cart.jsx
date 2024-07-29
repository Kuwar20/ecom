// src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/slices/cartSlice';
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen p-4'>
        <h1 className='text-2xl font-bold mb-4'>Cart</h1>
        {cartItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {cartItems.map((item) => (
                <div key={item.id} className='bg-white shadow-md rounded-lg p-6 flex flex-col'>
                  <img src={item.image} alt={item.title} className='w-full h-48 object-contain mb-4' />
                  <h2 className='text-sm font-semibold mb-2'>{item.title}</h2>
                  <p className='text-sm font-medium text-gray-700 mb-2'>Price: ${item.price}</p>
                  <p className='text-sm font-medium text-gray-700 mb-2'>Quantity: {item.quantity}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className='mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleClearCart}
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
              Clear Cart
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
