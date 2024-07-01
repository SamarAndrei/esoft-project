import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardType } from '../components/TCard';

const favoriteSlice = createSlice({
    name: 'favourites',
    initialState: [],
    reducers: {
        addToFavorite: (state, action: PayloadAction<CardType>) => {
            state.push(action.payload);
        },
        deleteFromFavorite: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
    },
});

export const { addToFavorite, deleteFromFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
