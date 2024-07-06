import { apiSlice } from './apiSlice'

export const librarianSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createLibrarian: builder.mutation({
			query: (data) => ({
				url: '/librarians/store',
				method: 'POST',
				body: data,
			}),
		}),
		getAllLibrarian: builder.query({
			query: (data) => ({
				url: '/librarians/all',
				method: 'GET',
			}),
		}),
	}),
})

export const { useCreateLibrarianMutation, useGetAllLibrarianQuery } =
	librarianSlice
