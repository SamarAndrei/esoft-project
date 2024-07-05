import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../http';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    tagTypes: ['orders'],
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
        getOrders: build.query({
            query: () => `orders`,
            providesTags: result =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'orders',
                              id,
                          })),
                          { type: 'orders', id: 'LIST' },
                      ]
                    : [{ type: 'orders', id: 'LIST' }],
        }),

        makeOrder: build.mutation({
            query: () => ({
                url: `orders`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'orders', id: 'LIST' }],
        }),
    }),
});

export const { useGetOrdersQuery, useMakeOrderMutation } = ordersApi;
