import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../service/authService';
import axios from 'axios';
import { API_URL } from '../http';

export const login = createAsyncThunk(
    'user/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(
                payload.email,
                payload.password,
            );
            localStorage.setItem('token', response.data.accessToken);
            return { isAuth: true };
        } catch (error) {
            console.error('Ошибка входа', error);
            return rejectWithValue(error.message);
        }
    },
);

export const registration = createAsyncThunk(
    'user/registration',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await AuthService.registration(
                payload.name,
                payload.email,
                payload.password,
            );
            localStorage.setItem('token', response.data.accessToken);
            return { isAuth: true };
        } catch (error) {
            console.error('Ошибка при регистрации', error);
            return rejectWithValue(error.message);
        }
    },
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            return { isAuth: false };
        } catch (error) {
            console.error('Ошибка при выходе', error);
            return rejectWithValue(error.message);
        }
    },
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
            });
            localStorage.setItem('token', response.data.accessToken);
            return { isAuth: true };
        } catch (error) {
            console.error('Ошибка проверки авторизации', error);
            return rejectWithValue(error.message);
        }
    },
);

const initialState = {
    isAuth: false,
    isLoading: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case login.pending.type:
        case registration.pending.type:
        case logout.pending.type:
        case checkAuth.pending.type:
            return {
                ...state,
                isLoading: true,
            };
        case login.fulfilled.type:
        case registration.fulfilled.type:
        case logout.fulfilled.type:
        case checkAuth.fulfilled.type:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                isLoading: false,
            };
        case login.rejected.type:
        case registration.rejected.type:
        case logout.rejected.type:
        case checkAuth.rejected.type:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default userReducer;
