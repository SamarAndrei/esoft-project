import { combineReducers } from 'redux';

const addOrDelToFavoriteReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return [...state, action.payload];
        case 'DELETE_FROM_FAVORITE':
            return state.filter(value => value !== action.payload);
        default:
            return state;
    }
};

const addOrDelToCartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'DELETE_FROM_CART':
            return state.filter(value => value !== action.payload);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    favorite: addOrDelToFavoriteReducer,
    cart: addOrDelToCartReducer,
});

export default rootReducer;
