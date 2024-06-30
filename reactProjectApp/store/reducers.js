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

// const queryReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'UPDATE_QUERY':
//             return action.payload;
//         case 'CLEAR_QUERY':
//             return '';
//         default:
//             return state;
//     }
// };

const rootReducer = combineReducers({
    favorite: addOrDelToFavoriteReducer,
    cart: addOrDelToCartReducer,
    // query: queryReducer,
});

export default rootReducer;
