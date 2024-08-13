// src/store/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await axios.get('http://localhost:3000/api/cart');
    return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item) => {
    const response = await axios.post('http://localhost:3000/api/cart', item);
    return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ id }) => {
    await axios.delete(`http://localhost:3000/api/cart/${id}`);
    return id;
});

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Ensure this is always an array
        status: null,
    },
    reducers: {
        clearCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
