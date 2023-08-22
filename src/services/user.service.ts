import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react"
import { IUser } from "../models"
import { store } from "../store"

export const userAPI = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["user"],
    endpoints: builder => ({
        fetchUser: builder.query<IUser[], void>({
            query: () => "/users",
            providesTags: ["user"]
        }),
        fetchOneUser: builder.query<IUser, number>({
            query: (id) => `/products/${id}`, // Assuming the server endpoint for fetching a single product is like "/products/:id"
            providesTags: (result, error, id) => [{ type: "user", id }], // Provide a tag for the specific product ID
        }),
        removeUser: builder.mutation({
            query: (id: number | string) => ({
                url: "/users/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["user"]
        }),
        addUser: builder.mutation({
            query: (product: IUser) => ({
                url: "/users",
                method: "POST",
                body: product
            }),
        }),
        updateUser: builder.mutation<IUser, Partial<IUser>>({
            query: (updatedProduct) => ({
                url: `/users/${updatedProduct.id}`, // Assuming the server endpoint for updating a product is like "/products/:id"
                method: "PUT",
                body: updatedProduct,
            }),
            invalidatesTags: (result, error, updatedProduct) => [{ type: "user", id: updatedProduct.id }], // Invalidate the cache for the updated product
        }),
    })
})

// setupListeners(store.dispatch)

export const { useFetchUserQuery, useRemoveUserMutation, useFetchOneUserQuery, useUpdateUserMutation, useAddUserMutation } = userAPI

