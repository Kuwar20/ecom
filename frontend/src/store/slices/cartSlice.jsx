// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
