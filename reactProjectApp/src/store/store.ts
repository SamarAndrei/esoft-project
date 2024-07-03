import { configureStore } from '@reduxjs/toolkit';
// import { cartReducer } from './cartApi';
import { favouritesApi } from './favouritesApi';
import userReducer from './userSlice';
import { cartApi } from './cartApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [favouritesApi.reducerPath]: favouritesApi.reducer,
    },
    middleware: getDefaultMiddlware =>
        getDefaultMiddlware().concat(
            cartApi.middleware,
            favouritesApi.middleware,
        ),
});
