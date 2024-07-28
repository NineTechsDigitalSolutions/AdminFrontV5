import { apiSlice } from './apiSlice'

export const materialSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createMaterial: builder.mutation({
			query: (data) => ({
				url: '/materials/store',
				method: 'POST',
				body: data,
			}),
		}),
		getAllMaterial: builder.query({
			query: () => ({
				url: '/materials/all',
				method: 'GET',
			}),
		}),
		deleteMaterial: builder.mutation({
			query: (data) => ({
				url: `/materials/delete/${data.id}`,
				method: 'POST',
			}),
		}),
		updateMaterial: builder.mutation({
			query: (data) => ({
				url: `/materials/update/${data.id}`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
})

export const {
	useCreateMaterialMutation,
	useGetAllMaterialQuery,
	useDeleteMaterialMutation,
	useUpdateMaterialMutation,
} = materialSlice
