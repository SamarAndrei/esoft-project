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
        login: (state, action) => {
            try {
                const response = AuthService.login(
                    action.payload.email,
                    action.payload.password,
                );
                localStorage.setItem('token', response.data.accessToken);
                return {
                    ...state,
                    isAuth: true,
                };
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        },
        registration: (state, action) => {
            try {
                const response = AuthService.registration(
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
                console.log(e.response?.data?.message);
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
                console.log(e.response?.data?.message);
            }
        },
        checkAuth: state => {
            try {
                const response = axios.get<AuthResponse>(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                console.log(response);
                localStorage.setItem('token', response.data.accessToken);
                return {
                    ...state,
                    isAuth: false,
                };
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        },
    },
});

export const { login, registration, logout, checkAuth } = userSlice.actions;

export const userReducer = userSlice.reducer;
