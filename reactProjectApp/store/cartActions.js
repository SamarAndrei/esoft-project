export const аddToCart = item => ({
    type: 'ADD_TO_CART',
    payload: item,
});

export const deleteFromCart = item => ({
    type: 'DELETE_FROM_CART',
    payload: item,
});
