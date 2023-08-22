import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories } from '../models';

export const categoryAPI = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['category'],
    endpoints: (builder) => ({
        fetchCategories: builder.query<ICategories[], void>({
            query: () => '/categories',
            providesTags: ['category'],
        }),
        fetchOneCategory: builder.query<ICategories, number>({
            query: (id) => `/categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'category', id }],
        }),
        removeCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category'],
        }),
        addCategory: builder.mutation<ICategories, Partial<ICategories>>({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['category'],
        }),
        updateCategory: builder.mutation<ICategories, Partial<ICategories>>({
            query: (updatedCategory) => ({
                url: `/categories/${updatedCategory.id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            // invalidatesTags: ['category'],
            invalidatesTags: (result, error, updatedCategory) => [{ type: 'category', id: updatedCategory.id }],
        }),
    }),
});

// Export hooks generated from the API
export const { useFetchCategoriesQuery, useFetchOneCategoryQuery, useRemoveCategoryMutation, useAddCategoryMutation, useUpdateCategoryMutation } =
    categoryAPI;
