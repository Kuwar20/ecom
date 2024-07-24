import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
//import cartReducer from './slices/cartSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart','products'] // Only persist auth and cart state
};

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    //cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);