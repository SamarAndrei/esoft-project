import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardType } from '../components/TCard';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action: PayloadAction<CardType>) => {
            state.push(action.payload);
        },
        deleteFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
    },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
