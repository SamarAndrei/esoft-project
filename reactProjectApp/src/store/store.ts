import { configureStore } from '@reduxjs/toolkit';
// import { cartReducer } from './cartApi';
import { favoriteReducer } from './favouritesSlice';
import userReducer from './userSlice';
import { cartApi } from './cartApi';

export const store = configureStore({
    reducer: {
        // cart: cartReducer,
        favourites: favoriteReducer,
        user: userReducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: getDefaultMiddlware =>
        getDefaultMiddlware().concat(cartApi.middleware),
});
//скрыть корзину и избранное кек)