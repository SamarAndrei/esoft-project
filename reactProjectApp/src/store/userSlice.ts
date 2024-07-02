import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../service/authService';
import { AuthResponse } from '../models/response/AuthResponse';
import axios from 'axios';
import { API_URL } from '../http';

const initialState = {
    isAuth: false,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: async (state, action) => {
            try {
                const response = await AuthService.login(
                    action.payload.email,
                    action.payload.password,
                );
                localStorage.setItem('token', response.data.accessToken);
                return {
                    ...state,
                    isAuth: true,
                };
            } catch (e) {
                console.error('ошибка входа', e);
            }
        },
        registration: async (state, action) => {
            try {
                const response = await AuthService.registration(
                    action.payload.name,
                    action.payload.email,
                    action.payload.password,
                );
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                return {
                    ...state,
                    isAuth: true,
                };
            } catch (e) {
                console.error('ошибка при регистрации', e);
            }
        },

        logout: state => {
            try {
                AuthService.logout();
                localStorage.removeItem('token');
                return {
                    ...state,
                    isAuth: false,
                };
            } catch (e) {
                console.error(e);
            }
        },
        checkAuth: async state => {
            try {
                const response = await axios.get<AuthResponse>(
                    `${API_URL}/refresh`,
                    {
                        withCredentials: true,
                    },
                );
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                return {
                    ...state,
                    isAuth: true,
                };
            } catch (e) {
                console.error('ошибка проверки', e);
            }
        },
    },
});

export const { login, registration, logout, checkAuth } = userSlice.actions;

export const userReducer = userSlice.reducer;
