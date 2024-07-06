import { apiSlice } from "./apiSlice";


export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        categoryAllGet: builder.query({
            query: () => ({
                url: '/categories/main/all',
                method: 'GET',
            })
        }),
        subCategoryAllGet: builder.query({
            query: () => ({
                url: 'categories/sub/all',
                method: 'GET',
            })
        }),
        categoryCreate: builder.mutation({
            query: (data) => ({
                url: '/categories/main/store',
                method: 'POST',
                body: data
            })
        }),

        categoryDelete: builder.mutation({
            query: (data) => ({
                url: `/categories/main/delete/${data.id}`,
                method: 'POST',
            })
        }),

        subCategoryCreate: builder.mutation({
            query: (data) => ({
                url: '/categories/sub/store',
                method: 'POST',
                body: data      
            })
        }),

        CategoryUpdate: builder.mutation({
            query: (data) => ({
                url: `/categories/main/update/${data.id}`,
                method: 'POST',
                body: data,
            })
        }),
        SubCategoryUpdate: builder.mutation({
            query: (data) => ({
                url: `/categories/sub/update/${data.id}`,
                method: 'POST',
                body: data,
            })
        }),
        SubCategoryDelete: builder.mutation({
            query: (data) => ({
                url: `/categories/sub/delete/${data.id}`,
                method: 'POST',
            })
        }),
    })
})

export const { useCategoryAllGetQuery, useCategoryCreateMutation, useSubCategoryCreateMutation, useSubCategoryAllGetQuery , useCategoryDeleteMutation , useCategoryUpdateMutation , useSubCategoryUpdateMutation , useSubCategoryDeleteMutation} = categorySlice

