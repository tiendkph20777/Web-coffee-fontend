import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICart } from "../models";
const cartApi = createApi({
    reducerPath: "cart",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["cart"],
    endpoints: builder => ({
        fetchCart: builder.query<ICart[], void>({
            query: () => "/cart",
            providesTags: ["cart"]
        }),
        removeCart: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["cart"],
        }),
        addCart: builder.mutation<ICart, ICart>({
            query: (cart) => ({
                url: "/cart",
                method: "POST",
                body: cart,
            }),
            invalidatesTags: ["cart"],
        }),
    }),
});

export const { useFetchCartQuery, useRemoveCartMutation, useAddCartMutation } =
    cartApi;
export default cartApi;
