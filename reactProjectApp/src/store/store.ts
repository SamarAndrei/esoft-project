import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartSlice';
import { favoriteReducer } from './favouritesSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourites: favoriteReducer,
        user: userReducer,
    },
});
