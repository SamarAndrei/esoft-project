import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    tagTypes: ['cart_items'],
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
        getCartItems: build.query({
            query: () => `cart`,
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'cart_items',
                              id,
                          })),
                          { type: 'cart_items', id: 'LIST' },
                      ]
                    : [{ type: 'cart_items', id: 'LIST' }],
        }),

        addCartItem: build.mutation({
            query: id => ({
                url: `production/${id}/cart`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'cart_items', id: 'LIST' }],
        }),

        deleteCartItem: build.mutation({
            query: id => ({
                url: `production/${id}/cart`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'cart_items', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCartItemsQuery,
    useAddCartItemMutation,
    useDeleteCartItemMutation,
} = cartApi;
