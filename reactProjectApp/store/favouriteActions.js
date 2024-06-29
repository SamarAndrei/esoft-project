export const аddToFavorite = item => ({
    type: 'ADD_TO_FAVORITE',
    payload: item,
});

export const deleteFromFavorite = item => ({
    type: 'DELETE_FROM_FAVORITE',
    payload: item,
});
