import { favouritesApi } from './favouritesApi';
import userReducer from './userSlice';
import { cartApi } from './cartApi';
import { ordersApi } from './ordersApi';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const rootReducer = combineReducers({
    user: userReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [favouritesApi.reducerPath]: favouritesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [cartApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    stateReconciler: hardSet,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(
            cartApi.middleware,
            favouritesApi.middleware,
            ordersApi.middleware,
        ),
});

export const persistor = persistStore(store);
export default store;
