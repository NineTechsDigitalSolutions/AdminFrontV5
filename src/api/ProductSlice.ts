import { apiSlice } from './apiSlice'

export const productSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createProduct: builder.mutation({
			query: (data) => ({
				url: '/product/create',
				method: 'POST',
                body: data,
			}),
		}),
        updateProduct: builder.mutation({
			query: (data) => ({
				url: '/product/create',
				method: 'POST',
                body: data,
			}),
		}),
		getAllProduct: builder.query({
			query: (data) => ({
				url: '/product/getAll',
				method: 'GET',
			}),
		}),
        ChangeProductStatus: builder.mutation({
			query: (data) => ({
				url: `/product/change-status/${data.id}`,
				method: 'POST',
                body: data,
			}),
		}),
        GetAllOrders: builder.query({
			query: () => ({
				url: `/order/getAll`,
				method: 'GET',
			}),
		}),
        SearchProducts: builder.mutation({
			query: (data) => ({
				url: `/product/search`,
				method: 'POST',
                body: data,
			}),
		}),
       

	}),
})

export const { useCreateProductMutation, useUpdateProductMutation, useGetAllProductQuery, useChangeProductStatusMutation, useGetAllOrdersQuery, useSearchProductsMutation } = productSlice