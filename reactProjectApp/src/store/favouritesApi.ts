import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

export const favouritesApi = createApi({
    reducerPath: 'favouritesApi',
    tagTypes: ['favourites'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: headers => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',
    }),
    endpoints: build => ({
        getFavourites: build.query({
            query: () => `favourites`,
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'favourites',
                              id,
                          })),
                          { type: 'favourites', id: 'LIST' },
                      ]
                    : [{ type: 'favourites', id: 'LIST' }],
        }),

        addFavourite: build.mutation({
            query: id => ({
                url: `production/${id}/favourites`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'favourites', id: 'LIST' }],
        }),

        deleteFavourite: build.mutation({
            query: id => ({
                url: `production/${id}/favourites`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'favourites', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetFavouritesQuery,
    useAddFavouriteMutation,
    useDeleteFavouriteMutation,
} = favouritesApi;
